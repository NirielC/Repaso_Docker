# Hoja rápida: comandos y errores

## Imágenes

| Para | Comando |
|---|---|
| Construir | `docker build -t nombre .` |
| Construir con usuario y versión | `docker build -t usuario/nombre:v1 .` |
| Ponerle otro nombre/tag | `docker tag nombre usuario/nombre:v1` |
| Listar | `docker images` |
| Borrar | `docker rmi nombre` |

## Contenedores

| Para | Comando |
|---|---|
| Crear y ejecutar (interactivo) | `docker run -it -p 5173:5173 nombre` |
| Igual, y se borra al detenerlo | `docker run -it --rm -p 5173:5173 nombre` |
| En segundo plano con nombre | `docker run -d --name web -p 5173:5173 nombre` |
| Ver los que están corriendo | `docker ps` |
| Ver todos (también detenidos) | `docker ps -a` |
| Ver logs (en vivo) | `docker logs -f web` |
| Entrar al contenedor | `docker exec -it web sh` (Alpine no tiene bash) |
| Detener / iniciar | `docker stop web` / `docker start web` |
| Borrar | `docker rm web` (detenido) / `docker rm -f web` (aunque corra) |
| Revisar el healthcheck | `docker inspect --format='{{json .State.Health}}' web` |

## Docker Hub

| Para | Comando |
|---|---|
| Iniciar sesión | `docker login` |
| Subir | `docker push usuario/nombre:v1` |
| Descargar | `docker pull usuario/nombre:v1` |
| Cerrar sesión | `docker logout` |

## Docker Compose

| Para | Comando |
|---|---|
| Versión | `docker compose version` |
| Construir e iniciar | `docker compose up --build` |
| En segundo plano | `docker compose up -d --build` |
| Ver servicios | `docker compose ps` |
| Logs | `docker compose logs -f` / `docker compose logs -f app` |
| Detener sin borrar | `docker compose stop` |
| Detener y eliminar | `docker compose down` |
| Eliminar también volúmenes | `docker compose down -v` |
| Reconstruir | `docker compose build` |
| Entrar a un servicio | `docker compose exec app sh` |

## Instrucciones del Dockerfile

| Instrucción | Qué hace |
|---|---|
| `FROM imagen:tag` | Imagen base (sin tag = `latest`) |
| `LABEL maintainer=...` | Datos del autor |
| `WORKDIR /app` | Carpeta de trabajo |
| `COPY origen destino` | Copia archivos |
| `ADD origen destino` | Como COPY, pero también descomprime y acepta URLs |
| `RUN comando` | Se ejecuta al **construir**; cada uno crea una capa |
| `ENV CLAVE valor` | Variables de entorno |
| `EXPOSE 5173` | Documenta el puerto (se publica con `-p`) |
| `VOLUME /ruta` | Punto de montaje para datos |
| `USER nombre` | Usuario con el que corre |
| `HEALTHCHECK ...` | Revisa periódicamente que el contenedor esté bien |
| `CMD [...]` | Comando por defecto al **iniciar**; solo vale el último |
| `ENTRYPOINT [...]` | Ejecutable fijo; lo de CMD pasa a ser sus argumentos |

## Errores típicos

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `failed to connect to the docker API` | Docker Desktop cerrado | Abrirlo y esperar *Engine running* |
| `port is already allocated` | Otro contenedor usa ese puerto | `docker ps` → `docker stop ...`, o usar otro: `-p 5174:5173` |
| El contenedor corre pero la página no carga | Vite escucha solo dentro del contenedor | `--host 0.0.0.0` en el CMD |
| `"docker build" requires exactly 1 argument` | Falta el `.` del final | `docker build -t nombre .` |
| `repository name must be lowercase` | Mayúsculas en el nombre | Todo en minúsculas |
| `denied: requested access to the resource is denied` | Sin login, o el nombre no empieza con tu usuario | `docker login` y `usuario/nombre:tag` |
| `Conflict. The container name ... is already in use` | Ya existe un contenedor con ese nombre | `docker rm -f nombre` |
| `npm error ... ENOENT package.json` en el build | Estás en la carpeta equivocada | `cd` a la carpeta que tiene el Dockerfile |
| Error de YAML en Compose | Tabulaciones o sangría mal | Solo espacios, mismo nivel para hermanos |
| Adminer no conecta con `localhost` | Dentro de Compose cada servicio es otra "máquina" | Servidor = nombre del servicio (`db`) |
