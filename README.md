# Docker: práctica de las guías 1, 2 y 3

Carpeta limpia para practicar **solo Docker** con un proyecto nuevo y simple.
El proyecto de la evaluación anterior (LESSAI) se queda en su carpeta, sin cambios.

## Qué hay aquí

| Carpeta / archivo | Qué es |
|---|---|
| `contact-manager/` | App React + Vite ya hecha (agregar contactos, tabla, eliminar, localStorage). **Aquí trabajas tú.** |
| `guias/01-guia1-dockerfile.md` | Guía 1: Dockerfile, `.dockerignore`, `docker build`, `docker run` |
| `guias/02-guia2-dockerhub.md` | Guía 2: `docker login`, `tag`, `push`, `pull`, versiones |
| `guias/03-guia3-compose.md` | Guía 3: `compose.yaml`, `docker compose up/ps/logs/down` + base de datos |
| `guias/04-comandos-y-errores.md` | Hoja rápida: todos los comandos y cómo salir de los errores típicos |

## Cómo usarlo

1. Abrir Docker Desktop (que diga *Engine running*).
2. Abrir la carpeta `contact-manager` en VS Code y una terminal ahí.
3. Seguir las guías **en orden** (1 → 2 → 3). Cada una tiene:
   - **Pasos**: lo que tienes que escribir/ejecutar tú.
   - **Qué deberías ver**: para saber si va bien.
   - 🔎 **Comprueba**: dónde mirar para confirmar que salió bien.
   - **Solución** al final: los archivos completos, para revisar *después* de intentarlo.

La app no es lo que se evalúa: no hace falta tocarla, salvo cambiar `VERSION` en `src/App.jsx` en la Guía 2.

## El flujo completo en una línea

```
código → Dockerfile → (build) → imagen → (run) → contenedor
                                  imagen → (push) → Docker Hub → (pull) → otra PC
                     compose.yaml → (docker compose up) → varios contenedores juntos
```
