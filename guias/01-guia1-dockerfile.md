# Guía 1: Dockerizar la app (Dockerfile)

**Meta:** que la app corra dentro de un contenedor y se abra en http://localhost:5173.

Todo se hace en la carpeta `contact-manager` (terminal abierta ahí).

---

## Paso 1: Revisar versiones y que la app compile

```bash
docker --version
```

```bash
node -v
```

```bash
npm run build
```

**Qué deberías ver:** `Docker version ...`, `v24...` y al final `✓ built in ...ms` con archivos en `dist/`.
Usamos `node:24-alpine` en el Dockerfile porque coincide con la versión de Node de la PC.

🔎 Comprueba: `node -v` y el `npm run build` terminado.

---

## Paso 2: Crear el `Dockerfile`

Archivo nuevo en la raíz de `contact-manager`, llamado exactamente **`Dockerfile`** (sin extensión, D mayúscula).
Escríbelo tú, instrucción por instrucción, pensando qué hace cada una:

| # | Instrucción | Qué hace |
|---|---|---|
| 1 | `FROM node:24-alpine` | Imagen base: Node 24 sobre Alpine Linux (ligera) |
| 2 | `WORKDIR /app` | Carpeta de trabajo dentro del contenedor |
| 3 | `COPY package*.json ./` | Copia **solo** `package.json` y `package-lock.json` primero |
| 4 | `RUN npm install` | Instala las dependencias **al construir** la imagen |
| 5 | `COPY . .` | Copia el resto del proyecto (menos lo de `.dockerignore`) |
| 6 | `RUN npm run build` | Genera la versión de producción (`dist/`) |
| 7 | `EXPOSE 5173` | **Documenta** el puerto (no lo abre; eso lo hace `-p`) |
| 8 | `CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]` | Comando que corre **al arrancar** el contenedor |

**Para entenderlo (preguntas típicas):**

- ¿Por qué copiar `package*.json` antes que todo? → Cada instrucción es una **capa**. Si no cambian las
  dependencias, Docker reutiliza la capa de `npm install` (dice `CACHED`) y construye mucho más rápido.
- ¿`RUN` vs `CMD`? → `RUN` se ejecuta al **construir** la imagen; `CMD` al **iniciar** el contenedor.
- ¿Por qué `--host 0.0.0.0`? → Vite por defecto solo escucha dentro del contenedor (localhost del
  contenedor); con `0.0.0.0` acepta conexiones de afuera, o sea de tu PC.
- ¿Para qué el `--` suelto? → Separa los argumentos de npm de los que se le pasan a Vite.

---

## Paso 3: Crear el `.dockerignore`

Archivo nuevo **`.dockerignore`** (con punto) en la raíz. Lo que diga aquí **no** se copia a la imagen.

1. Copia **todo** el contenido de `.gitignore` y pégalo en `.dockerignore`.
2. **Borra** estas tres líneas: `dist`, `dist-ssr`, `*.local` (así lo pide la guía).
3. Revisa que quede la línea `node_modules`: las dependencias se instalan **dentro** del contenedor,
   copiar las de Windows haría la imagen pesada y podría romperla.

---

## Paso 4: Construir la imagen

```bash
docker build -t contact-manager .
```

- `-t contact-manager` = nombre (tag) de la imagen. Debe ir en **minúsculas**.
- El `.` final = el **contexto**: la carpeta actual. Es lo que más se olvida.

**Qué deberías ver:** pasos `[1/6] FROM ...` hasta `[6/6] RUN npm run build`, y al final
`naming to docker.io/library/contact-manager`. Si lo repites sin cambiar nada, verás `CACHED`.

```bash
docker images
```

🔎 Comprueba: el build terminado y `docker images` mostrando `contact-manager`.

---

## Paso 5: Ejecutar el contenedor

```bash
docker run -it -p 5173:5173 contact-manager
```

- `-p 5173:5173` = **puerto de tu PC : puerto del contenedor**.
- `-it` = modo interactivo: ves la salida y lo cortas con `Ctrl + C`.

**Qué deberías ver:** `VITE ... ready` y `Local: http://localhost:5173/`.
Abre **http://localhost:5173**, agrega un contacto y recarga: debe seguir ahí.

🔎 Comprueba: la terminal con Vite corriendo, la app en el navegador con un contacto, y Docker Desktop →
**Containers** con el contenedor en verde y `5173:5173`.

Para detenerlo: `Ctrl + C` en la terminal (o el botón ■ en Docker Desktop).

---

## Paso 6: Variantes que conviene probar

En segundo plano y con nombre propio (así no te pone uno aleatorio tipo `awesome_zhukovsky`):

```bash
docker run -d --name contactos -p 5173:5173 contact-manager
```

```bash
docker ps
```

```bash
docker logs contactos
```

```bash
docker stop contactos
```

```bash
docker rm contactos
```

Otro puerto en tu PC (como en la guía, cuando el 5173 está ocupado):

```bash
docker run -it --rm -p 7173:5173 contact-manager
```

→ Se abre en http://localhost:7173. `--rm` borra el contenedor solo al detenerlo.

---

## ✅ Checklist Guía 1

- [ ] `Dockerfile` creado y sé explicar cada línea
- [ ] `.dockerignore` creado (sin `dist`, `dist-ssr`, `*.local`; con `node_modules`)
- [ ] `docker build -t contact-manager .` sin errores
- [ ] `docker run -it -p 5173:5173 contact-manager` y la app abre en el navegador

---

## ⭐ Extra: Dockerfile optimizado (si piden "optimizar")

El de la guía hace `npm run build` pero después corre en modo **dev**, así que el build no se usa y la
imagen lleva Node y todas las dependencias (~480 MB en `docker images`). Con **multi-stage** se construye
en una etapa y solo se copia el resultado a un servidor web liviano (~100 MB):

```dockerfile
# Etapa 1: construir
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: servir solo dist con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t contact-manager:optimizado .
```

```bash
docker run -it --rm -p 5173:80 contact-manager:optimizado
```

Fíjate que ahora es `5173:80`: Nginx escucha en el 80 dentro del contenedor.
Técnicas de optimización para nombrar: imagen **alpine**, **orden de capas**, **.dockerignore**,
`npm ci` (instalación exacta desde el lock) y **multi-stage**.
⚠️ Para la Guía 3 usa el Dockerfile normal de la guía (el `compose.yaml` de la guía está pensado para modo dev).

---

## Solución (revisar después de intentarlo)

<details>
<summary>Dockerfile</summary>

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
```
</details>

<details>
<summary>.dockerignore</summary>

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```
</details>
