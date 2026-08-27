# Reglas verificables

Cada regla expresa una violación que se puede detectar en código, configuración, archivos o build.

1. No leer, imprimir, copiar ni versionar `.env.local`; solo consultar `.env.local.example`.
2. No guardar credenciales, tokens ni datos sensibles en código fuente, documentación, logs o archivos generados.
3. No publicar `admin-local.html` ni `src/admin/` dentro de `dist/`.
4. No agregar el admin como entrada de producción en `vite.config.ts`.
5. No describir la validación de credenciales del navegador como autenticación segura para producción.
6. No editar archivos dentro de `dist/`; regenerarlos con `npm run build`.
7. No depender de `localStorage` como único respaldo sin advertirlo cuando se cambie el flujo de datos.
8. No borrar o renombrar las claves `cm_portfolio_*` sin una migración explícita o una decisión registrada.
9. No permitir IDs vacíos o duplicados en proyectos.
10. No introducir estados de contenido fuera de `published`, `draft` y `archived` sin actualizar tipos, filtros, Excel y documentación.
11. No mostrar proyectos `draft` o `archived` en vistas públicas.
12. No mostrar más de seis proyectos destacados en Home.
13. No incluir proyectos no publicados entre los destacados de Home.
14. No cambiar la estructura de importación/exportación Excel sin comprobar ambos sentidos del flujo.
15. No aceptar como válidos archivos Excel vacíos o proyectos sin ID, título y empresa.
16. No usar radios distintos de 4 px en tarjetas, botones, inputs o contenedores; `rounded-full` queda reservado para chips/badges.
17. No introducir gradientes multicolor, sombras oscuras difusas o tarjetas anidadas en la UI Olivia.
18. No truncar etiquetas de chips o botones; deben permanecer en una línea.
19. No superar 1320 px de ancho para el contenedor principal público sin registrar el cambio de diseño.
20. No cambiar código TypeScript/React o configuración sin ejecutar `npm run lint`.
21. No cerrar cambios de ejecución/publicación sin ejecutar `npm run build`.
22. No dejar `AGENTS.md` por encima de 300 líneas.
23. No copiar transcripciones completas ni documentos grandes a `logs/`, `state/` o prompts futuros.
24. No duplicar una misma decisión en varios archivos; `contexto/decisiones.md` solo indexa registros canónicos de `decisions/`.
