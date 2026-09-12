# ADR-007: contenido editorial opcional por proyecto

Fecha: 2026-09-11  
Estado: aceptada

## Contexto

El caso Schwager necesita una narrativa de Product Design más rica que el modelo común: audiencias, proceso, relaciones entre hallazgos y decisiones, arquitectura, evidencias clasificadas, resultados verificados, restricciones y aprendizajes. Cambiar el contrato obligatorio habría exigido migrar todos los proyectos y alterado su presentación.

## Decisión

Agregar `caseStudy.editorial` como objeto opcional y retrocompatible. La vista especializada aparece solo cuando existe; los proyectos sin el objeto mantienen el detalle anterior. La exportación Excel conserva el objeto como JSON validado y el administrador local ofrece controles para sus listas. `contentRevision` permite adoptar una actualización versionada sin que un `localStorage` antiguo la oculte.

## Consecuencias

- Schwager puede presentar y administrar el relato completo sin modificar los otros proyectos.
- Las secciones y tarjetas vacías no se renderizan; las cifras cuantitativas requieren `verified: true`.
- Las imágenes editoriales entran en el seguimiento del repositorio local de imágenes.
- Antes/después queda preparado, pero oculto hasta contar con imágenes y textos completos.
- Una nueva revisión editorial del snapshot debe aumentar `contentRevision` para reemplazar una copia antigua del mismo proyecto en el navegador.
