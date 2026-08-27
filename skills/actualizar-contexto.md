---
name: actualizar-contexto
description: Mantiene la memoria persistente del portafolio al cerrar una sesión importante o completar un cambio de fase; no se usa en cada mensaje.
---

# Actualizar contexto

## Cuándo ejecutarlo

Ejecutar al cerrar una sesión importante, completar una funcionalidad, resolver un bloqueo, cambiar arquitectura/producto o antes de transferir el trabajo. No ejecutar por cada mensaje ni por cambios triviales sin efecto futuro.

## Resultado obligatorio

La memoria queda vigente, verificable y más corta que al empezar. Si no puede quedar más corta, no debe crecer salvo que exista información nueva que cambie decisiones futuras.

## Procedimiento

1. Revisar solo los archivos modificados, las verificaciones realizadas y la memoria relacionada.
2. Actualizar `state/current.md`:
   - mover lo completado fuera de pendientes;
   - dejar próximos pasos concretos;
   - conservar únicamente bloqueos actuales con evidencia.
3. Actualizar `decisions/` solo si hubo una elección duradera con alternativas:
   - fecha y estado;
   - contexto;
   - decisión;
   - razonamiento;
   - consecuencias.
   Añadir o corregir su puntero en `contexto/decisiones.md` sin duplicar el contenido completo.
4. Actualizar `gotchas/` si apareció o cambió un problema reproducible. Incluir señal, causa y mitigación comprobable.
5. Crear o compactar un archivo en `logs/` solo si la sesión aporta contexto que no cabe en estado, decisión o gotcha. Registrar resultado, archivos afectados, pruebas y pendientes; nunca la conversación completa.
6. Modificar `reglas.md` solo si cambió una línea roja verificable. Mantener `contexto/reglas.md` como puntero breve, no como copia.
7. Eliminar hechos obsoletos, fusionar duplicados y reemplazar prosa histórica por enlaces a la fuente canónica.
8. Comprobar que `AGENTS.md` conserva alta densidad y no supera 300 líneas.
9. Verificar enlaces/rutas mencionadas y revisar el diff o la lista final de archivos.

## Criterios de compresión

- Un hecho vigente va en `state/`; una decisión con trade-offs va en `decisions/`; un fallo repetible va en `gotchas/`; el resto solo entra en `logs/` si será útil después.
- Conservar resultados y razones; eliminar cronología conversacional, intentos fallidos sin aprendizaje y detalles recuperables con una búsqueda barata.
- No copiar historial al prompt ni cargar el repositorio completo.
- Preferir `archivo:sección`, símbolo o comando de verificación antes que pegar fragmentos largos.
- Borrar lo que ya no sirve y compactar logs antiguos cuando el estado o una decisión ya contienen lo valioso.
- No crear archivos vacíos, índices redundantes ni un archivo nuevo por cada cambio pequeño.

## Comprobación final

- `state/current.md` coincide con el proyecto real.
- Toda decisión nueva tiene una única fuente canónica.
- No hay secretos, transcripciones ni contenido duplicado.
- Los pendientes tienen acción siguiente; los bloqueos tienen evidencia.
- `AGENTS.md` tiene 300 líneas o menos.
- El total de contexto mantenido quedó más corto que al inicio o su crecimiento está justificado por información nueva y duradera.

