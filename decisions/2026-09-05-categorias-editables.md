# Categorías editables de proyectos

Fecha de registro: 2026-09-05. Estado: aceptada.

## ADR-006 — Categorías derivadas del contenido

Contexto: el administrador y los filtros públicos dependían de una unión y listas fijas de categorías. Esto impedía crear una categoría nueva sin modificar código en varios lugares.

Decisión: `Project.category` es un identificador de texto generado desde el nombre visible y `categoryLabel` conserva su etiqueta. El editor permite elegir una etiqueta existente o escribir una nueva. Home, catálogo y Excel derivan y preservan las categorías presentes en los proyectos publicados.

Razonamiento: una categoría es contenido administrable y debe mantenerse consistente entre edición, importación y filtros públicos sin requerir despliegues de código por cada alta.

Consecuencias: una categoría nueva aparece en los filtros cuando existe al menos un proyecto publicado con ese identificador. Renombrar la categoría de un proyecto no renombra automáticamente otros proyectos que todavía usan la etiqueta anterior.
