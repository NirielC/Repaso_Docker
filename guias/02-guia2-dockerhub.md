# Guía 2: Subir la imagen a Docker Hub

**Meta:** que la imagen quede en tu cuenta de Docker Hub y cualquiera la pueda descargar (`pull`) y correr.

Requisito: haber terminado la Guía 1 (ya existe la imagen `contact-manager`).
En todos los comandos cambia **`TU_USUARIO`** por tu usuario de Docker Hub (el que sale en hub.docker.com
arriba a la derecha, no tu correo).

---

## Paso 1: Iniciar sesión

```bash
docker login
```

**Qué deberías ver:** `Login Succeeded`. Si ya habías entrado en Docker Desktop, entra solo
(`Authenticating with existing credentials`).

🔎 Comprueba: `Login Succeeded`.

---

## Paso 2: Crear la imagen con tu usuario y versión

El nombre para Docker Hub siempre es **`usuario/proyecto:tag`**.

```bash
docker build -t TU_USUARIO/contact-manager:v1 .
```

Otra forma, sin volver a construir: ponerle un nombre nuevo a la imagen que ya tienes.

```bash
docker tag contact-manager TU_USUARIO/contact-manager:v1
```

```bash
docker images
```

**Qué deberías ver:** `TU_USUARIO/contact-manager` con tag `v1`. Si usaste `docker tag`, tiene el
**mismo IMAGE ID** que `contact-manager`: es la misma imagen con dos nombres.

🔎 Comprueba: el build (o tag) y `docker images`.

---

## Paso 3: Subirla (push)

```bash
docker push TU_USUARIO/contact-manager:v1
```

**Qué deberías ver:** varias líneas `Pushing [====>  ]` y luego `Pushed`, y al final `v1: digest: sha256:...`.

🔎 Comprueba: el push terminado.

---

## Paso 4: Revisar en Docker Hub

hub.docker.com → **My Hub** → **Repositories** → `TU_USUARIO/contact-manager` → pestaña **Tags**: aparece `v1`.
El repositorio se crea solo con el primer push (público por defecto).

🔎 Comprueba: el repositorio y el tag `v1`.

---

## Ejercicio 1: Descargarla (pull)

Para probar de verdad la descarga, primero borra la copia local:

```bash
docker rmi TU_USUARIO/contact-manager:v1
```

```bash
docker pull TU_USUARIO/contact-manager:v1
```

```bash
docker run -it --rm -p 5173:5173 TU_USUARIO/contact-manager:v1
```

**Qué deberías ver:** `Pull complete` / `Downloaded newer image`, y la app en http://localhost:5173.
En otra computadora (o la de un compañero) es igual: solo necesita Docker; ni Node ni el código.

🔎 Comprueba: el pull y la app corriendo desde la imagen descargada.

---

## Ejercicio 2: Nueva versión (v2)

1. Abre `src/App.jsx` y cambia `const VERSION = 'v1'` por `const VERSION = 'v2'`
   (puedes cambiar también el título o un color para que se note).
2. Construye y sube la nueva versión:

```bash
docker build -t TU_USUARIO/contact-manager:v2 .
```

```bash
docker push TU_USUARIO/contact-manager:v2
```

3. Pruébala (en tu PC o en otra):

```bash
docker pull TU_USUARIO/contact-manager:v2
```

```bash
docker run -it --rm -p 5173:5173 TU_USUARIO/contact-manager:v2
```

**Qué deberías ver:** en Docker Hub dos tags, `v1` y `v2`; la app muestra **v2** junto al título.
En el push de v2 varias capas dicen `Layer already exists`: Docker solo sube lo que cambió.

🔎 Comprueba: Docker Hub con los dos tags y la app mostrando v2.

---

## Para entenderlo (preguntas típicas)

- **Tag:** la versión de la imagen. Si no pones ninguno, Docker usa **`latest`**.
  (`docker push TU_USUARIO/contact-manager` sube `:latest`.)
- **push** = subir de tu PC a Docker Hub. **pull** = bajar de Docker Hub a tu PC.
- **Repositorio público vs privado:** público lo descarga cualquiera; privado solo tú o quien autorices.
- **Imágenes oficiales:** `node`, `nginx`, `mysql`, `python`... verificadas y mantenidas, se usan sin usuario
  delante (`FROM node:24-alpine`).
- ¿Por qué falla el push con `denied`? → No hiciste `docker login`, o el nombre no empieza con **tu** usuario.

---

## ✅ Checklist Guía 2

- [ ] `docker login` → Login Succeeded
- [ ] Imagen `TU_USUARIO/contact-manager:v1` creada (build o tag)
- [ ] `docker push` terminado y el repo visible en Docker Hub
- [ ] Ejercicio 1: `rmi` → `pull` → `run` funciona
- [ ] Ejercicio 2: `v2` subida, dos tags en Docker Hub, la app muestra v2
