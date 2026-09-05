import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const CONTENT_SYNC_PATH = '/__portfolio-admin/sync';
const IMAGE_UPLOAD_PATH = '/__portfolio-admin/upload';
const MAX_SYNC_BYTES = 25 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const CONTENT_FILE = path.resolve(__dirname, 'src/data/portfolioContent.json');
const PUBLIC_UPLOADS_DIR = path.resolve(__dirname, 'public/uploads');
const SOURCE_ASSETS_DIR = path.resolve(__dirname, 'src/assets');
const VALID_STATUSES = new Set(['published', 'draft', 'archived']);
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/svg+xml': '.svg',
  'image/webp': '.webp'
};
const ALLOWED_UPLOAD_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const jsonResponse = (response: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string) => void }, status: number, payload: unknown) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
};

const readRequestBody = async (request: AsyncIterable<Buffer | string>) => {
  const chunks: Buffer[] = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    receivedBytes += buffer.length;
    if (receivedBytes > MAX_SYNC_BYTES) {
      throw new Error('El contenido supera el límite local de 25 MB.');
    }
    chunks.push(buffer);
  }

  return Buffer.concat(chunks).toString('utf8');
};

const readRequestBuffer = async (request: AsyncIterable<Buffer | string>, maxBytes: number) => {
  const chunks: Buffer[] = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    receivedBytes += buffer.length;
    if (receivedBytes > maxBytes) {
      throw new Error('La imagen supera el límite de 2 MB.');
    }
    chunks.push(buffer);
  }

  return Buffer.concat(chunks);
};

const isAllowedLocalRequest = (origin: string | undefined, host: string | undefined) => {
  if (!origin || !host) return false;

  try {
    const parsedOrigin = new URL(origin);
    return parsedOrigin.protocol === 'http:'
      && ['localhost', '127.0.0.1', '[::1]'].includes(parsedOrigin.hostname)
      && parsedOrigin.host === host;
  } catch {
    return false;
  }
};

const validateSnapshot = (snapshot: Record<string, unknown>) => {
  const arrayFields = [
    'projects',
    'experiences',
    'previousExperiences',
    'education',
    'courses',
    'languages',
    'recruiterMetrics'
  ];

  if (!snapshot.portfolioOwner || typeof snapshot.portfolioOwner !== 'object') {
    throw new Error('El perfil del portafolio no es válido.');
  }

  for (const field of arrayFields) {
    if (!Array.isArray(snapshot[field])) {
      throw new Error(`El campo ${field} debe ser una lista.`);
    }
  }

  const projects = snapshot.projects as Array<Record<string, unknown>>;
  if (projects.length === 0) {
    throw new Error('El portafolio debe conservar al menos un proyecto.');
  }

  const ids = new Set<string>();
  for (const project of projects) {
    const id = typeof project.id === 'string' ? project.id.trim() : '';
    const title = typeof project.title === 'string' ? project.title.trim() : '';
    const company = typeof project.company === 'string' ? project.company.trim() : '';
    const status = project.status || 'published';

    if (!id || !title || !company) {
      throw new Error('Cada proyecto necesita ID, título y empresa.');
    }
    if (ids.has(id)) {
      throw new Error(`El ID de proyecto ${id} está duplicado.`);
    }
    if (typeof status !== 'string' || !VALID_STATUSES.has(status)) {
      throw new Error(`El proyecto ${id} tiene un estado no permitido.`);
    }
    ids.add(id);
  }
};

const writeIfChanged = async (filePath: string, content: Buffer | string) => {
  try {
    const current = await readFile(filePath);
    const next = Buffer.isBuffer(content) ? content : Buffer.from(content);
    if (current.equals(next)) return false;
  } catch {
    // El archivo todavía no existe.
  }

  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, content);
  await rename(temporaryPath, filePath);
  return true;
};

const persistImageUrl = async (rawUrl: unknown): Promise<unknown> => {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) return rawUrl;
  const url = rawUrl.trim();

  const dataImage = url.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (dataImage) {
    const extension = IMAGE_EXTENSIONS[dataImage[1].toLowerCase()];
    if (!extension) throw new Error(`Formato de imagen no compatible: ${dataImage[1]}.`);

    const bytes = Buffer.from(dataImage[2], 'base64');
    if (bytes.length > 10 * 1024 * 1024) {
      throw new Error('Una imagen supera el límite local de 10 MB.');
    }

    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const fileName = `${hash}${extension}`;
    await mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
    await writeIfChanged(path.join(PUBLIC_UPLOADS_DIR, fileName), bytes);
    return `/uploads/${fileName}`;
  }

  if (url.startsWith('blob:')) {
    throw new Error('La imagen usa una URL temporal. Vuelve a cargarla antes de sincronizar.');
  }

  let pathname = url;
  try {
    pathname = new URL(url, 'http://127.0.0.1:3000').pathname;
  } catch {
    return url;
  }

  if (pathname.startsWith('/src/assets/')) {
    const sourcePath = path.resolve(__dirname, pathname.slice(1));
    const relativeAssetPath = path.relative(SOURCE_ASSETS_DIR, sourcePath);
    if (relativeAssetPath.startsWith('..') || path.isAbsolute(relativeAssetPath)) {
      throw new Error('La imagen apunta fuera de src/assets.');
    }
    return `asset:${relativeAssetPath.split(path.sep).join('/')}`;
  }

  return url;
};

const persistImageUrls = async (rawImages: unknown) => {
  if (!Array.isArray(rawImages)) return undefined;

  const images = await Promise.all(rawImages.map(persistImageUrl));
  const urls = images.filter((image): image is string => typeof image === 'string' && image.trim().length > 0);
  return urls.length > 0 ? urls : undefined;
};

const normalizeSnapshotImages = async (snapshot: Record<string, unknown>) => {
  const projects = snapshot.projects as Array<Record<string, unknown>>;
  return {
    ...snapshot,
    projects: await Promise.all(projects.map(async (project) => {
      const caseStudy = project.caseStudy && typeof project.caseStudy === 'object' && !Array.isArray(project.caseStudy)
        ? project.caseStudy as Record<string, unknown>
        : undefined;

      return {
        ...project,
        coverImage: await persistImageUrl(project.coverImage),
        caseStudy: caseStudy
          ? {
              ...caseStudy,
              interfaceImages: await persistImageUrls(caseStudy.interfaceImages)
            }
          : project.caseStudy
      };
    }))
  };
};

const portfolioContentSyncPlugin = (): Plugin => ({
  name: 'portfolio-local-content-sync',
  apply: 'serve',
  handleHotUpdate({ file }) {
    const resolvedFile = path.resolve(file);
    // El admin genera estos archivos; evitar HMR mantiene estable el editor.
    if (resolvedFile === CONTENT_FILE || resolvedFile.startsWith(`${PUBLIC_UPLOADS_DIR}${path.sep}`)) return [];
  },
  configureServer(server) {
    server.middlewares.use(IMAGE_UPLOAD_PATH, (request, response, next) => {
      if (request.method !== 'POST') {
        next();
        return;
      }

      const origin = typeof request.headers.origin === 'string' ? request.headers.origin : undefined;
      const host = typeof request.headers.host === 'string' ? request.headers.host : undefined;
      if (!isAllowedLocalRequest(origin, host) || request.headers['x-portfolio-admin-upload'] !== '1') {
        jsonResponse(response, 403, { success: false, message: 'Carga local no autorizada.' });
        return;
      }

      void (async () => {
        try {
          const contentTypeHeader = request.headers['content-type'];
          const contentType = typeof contentTypeHeader === 'string'
            ? contentTypeHeader.split(';')[0].trim().toLowerCase()
            : '';
          if (!ALLOWED_UPLOAD_TYPES.has(contentType)) {
            throw new Error('Formato no compatible. Usa PNG, JPG o WebP.');
          }

          const contentLength = Number(request.headers['content-length'] || 0);
          if (contentLength > MAX_UPLOAD_BYTES) {
            throw new Error('La imagen supera el límite de 2 MB.');
          }

          const bytes = await readRequestBuffer(request, MAX_UPLOAD_BYTES);
          if (bytes.length === 0) throw new Error('El archivo de imagen está vacío.');

          const extension = IMAGE_EXTENSIONS[contentType];
          const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
          const fileName = `${hash}${extension}`;
          await mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
          await writeIfChanged(path.join(PUBLIC_UPLOADS_DIR, fileName), bytes);

          const encodedOriginalName = request.headers['x-file-name'];
          let originalName = fileName;
          if (typeof encodedOriginalName === 'string') {
            try {
              originalName = decodeURIComponent(encodedOriginalName);
            } catch {
              originalName = encodedOriginalName;
            }
          }

          jsonResponse(response, 200, {
            success: true,
            url: `/uploads/${fileName}`,
            name: originalName.replace(/\.[a-z0-9]+$/i, ''),
            size: bytes.length
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'No se pudo cargar la imagen.';
          jsonResponse(response, 400, { success: false, message });
        }
      })();
    });

    server.middlewares.use(CONTENT_SYNC_PATH, (request, response, next) => {
      if (request.method !== 'POST') {
        next();
        return;
      }

      const origin = typeof request.headers.origin === 'string' ? request.headers.origin : undefined;
      const host = typeof request.headers.host === 'string' ? request.headers.host : undefined;
      if (!isAllowedLocalRequest(origin, host) || request.headers['x-portfolio-admin-sync'] !== '1') {
        jsonResponse(response, 403, { success: false, message: 'Sincronización local no autorizada.' });
        return;
      }

      void (async () => {
        try {
          const body = await readRequestBody(request);
          const parsed = JSON.parse(body) as unknown;
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error('El snapshot recibido no es válido.');
          }

          const snapshot = parsed as Record<string, unknown>;
          validateSnapshot(snapshot);
          const normalizedSnapshot = await normalizeSnapshotImages(snapshot);
          const serialized = `${JSON.stringify(normalizedSnapshot, null, 2)}\n`;
          const changed = await writeIfChanged(CONTENT_FILE, serialized);
          if (changed) {
            server.config.logger.info('Contenido del administrador sincronizado con src/data/portfolioContent.json.');
          }
          jsonResponse(response, 200, { success: true, changed });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'No se pudo sincronizar el contenido.';
          jsonResponse(response, 400, { success: false, message });
        }
      })();
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), portfolioContentSyncPlugin()],
    server: {
      watch: {
        ignored: ['**/public/uploads/**', '**/src/data/portfolioContent.json']
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
      },
    },
  };
});
