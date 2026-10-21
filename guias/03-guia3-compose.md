# Guía 3: Docker Compose

**Meta:** levantar la app con un archivo `compose.yaml` y un solo comando, y después agregar una base de
datos como segundo servicio (Actividad complementaria 4).

Requisito: el `Dockerfile` y el `.dockerignore` de la Guía 1.

**Docker vs Docker Compose:**
- Antes: `docker build -t contact-manager .` + `docker run -it -p 5173:5173 contact-manager` (y uno por contenedor).
- Ahora: toda la configuración en `compose.yaml` → `docker compose up --build`, y levanta **todos** los servicios.

---

## Paso 1: Comprobar que Compose está instalado

```bash
docker compose version
```

**Qué deberías ver:** `Docker Compose version v5...` (ya viene con Docker Desktop).


---

## Paso 2: Crear `compose.yaml`

Archivo nuevo **`compose.yaml`** en la raíz de `contact-manager` (junto al Dockerfile).
⚠️ YAML usa **espacios** para la sangría (nunca tabulaciones) y la sangría importa.

| Línea | Qué hace |
|---|---|
| `services:` | Lista de servicios (contenedores) que se van a ejecutar |
| `app:` | Nombre del servicio. Puedes cambiarlo |
| `build:` | Construye la imagen con tu Dockerfile |
| `context: .` | La carpeta actual es el contexto de construcción |
| `dockerfile: Dockerfile` | Qué Dockerfile usar |
| `container_name: contenedor_con_compose` | Nombre fijo para el contenedor |
| `ports: - "5173:5173"` | Puerto de tu PC : puerto del contenedor |
| `volumes: - .:/app` | Sincroniza la carpeta del proyecto con `/app` (ves los cambios sin reconstruir) |
| `volumes: - /app/node_modules` | Conserva las dependencias instaladas **dentro** del contenedor (que no las tape la carpeta de Windows) |
| `restart: unless-stopped` | Si se cae, se reinicia solo (menos si tú lo detienes) |

---

## Paso 3: Construir e iniciar

Antes, si dejaste un contenedor de la Guía 1 corriendo en el puerto 5173, detenlo (Docker Desktop ■ o `docker stop`).

```bash
docker compose up --build
```

**Qué deberías ver:** se construye la imagen, luego líneas que empiezan con `contenedor_con_compose |` y
`VITE ... ready`, `Local: http://localhost:5173/`.
Abre **http://localhost:5173**.

En Docker Desktop → Containers aparece un **grupo** con el nombre de la carpeta (`contact-manager`) y
dentro el contenedor `contenedor_con_compose`.

🔎 Comprueba: la terminal, la app en el navegador y el grupo en Docker Desktop.

Para cortarlo: `Ctrl + C` (eso **detiene** pero no borra).

---

## Paso 4: Los demás comandos (abre otra terminal, o usa `-d`)

En segundo plano, para que la terminal quede libre:

```bash
docker compose up -d --build
```

```bash
docker compose ps
```

```bash
docker compose logs -f app
```

(`Ctrl + C` sale de los logs sin detener nada.)

```bash
docker compose exec app sh
```

(Dentro: `ls`, `node -v`, y `exit` para salir. En Alpine no hay `bash`, por eso `sh`.)

```bash
docker compose stop
```

```bash
docker compose down
```

**Qué deberías ver con `down`:** `Container contenedor_con_compose Removed` y `Network contact-manager_default Removed`.
En Docker Desktop ya no aparece el grupo (solo los contenedores que creaste a mano en la Guía 1).

🔎 Comprueba: `docker compose ps` y `docker compose down`.

| Objetivo | Comando |
|---|---|
| Construir e iniciar | `docker compose up --build` |
| Iniciar en segundo plano | `docker compose up -d --build` |
| Ver contenedores activos | `docker compose ps` |
| Ver los registros | `docker compose logs -f` |
| Registros de un servicio | `docker compose logs -f app` |
| Detener (sin borrar) | `docker compose stop` |
| Detener y eliminar | `docker compose down` |
| Reconstruir la imagen | `docker compose build` |
| Ejecutar comandos dentro | `docker compose exec app sh` |

---

## Paso 5 (Actividad 4): Agregar una base de datos

**¿Qué cambia cuando la app necesita base de datos?**

1. Un **servicio nuevo** con la imagen oficial de la base (`mysql:8.4`): no necesita Dockerfile.
2. **Variables de entorno** (`environment`) con usuario, contraseña y nombre de la base.
3. Un **volumen con nombre** para que los datos **no se pierdan** al hacer `down`.
4. `depends_on` para que lo que usa la base arranque **después** de ella.
5. Para conectarse se usa el **nombre del servicio** como servidor (`db`), **no** `localhost`:
   Compose pone todos los servicios en la **misma red** y cada uno se llama por su nombre.

Como el Contact Manager guarda en localStorage, la conexión la comprobamos con **Adminer**, un panel web
que se conecta a la base igual que lo haría una app.

Agrega al `compose.yaml`, dentro de `services:` (al mismo nivel que `app:`), los servicios `db` y `adminer`,
y al final del archivo (sin sangría) la sección `volumes:` con `datos_db:`. Mira la solución si te trabas.

```bash
docker compose up -d --build
```

```bash
docker compose ps
```

**Qué deberías ver:** tres contenedores `Up`: `contenedor_con_compose` (5173), `cm_db` (3306 interno) y `cm_adminer` (8080).

Abre **http://localhost:8080** y entra con:

| Campo | Valor |
|---|---|
| Sistema | MySQL |
| Servidor | `db` ← el nombre del servicio |
| Usuario | `usuario` |
| Contraseña | `usuario123` |
| Base de datos | `contactos` |

Crea una tabla y un registro desde Adminer (**Comando SQL**):

```sql
CREATE TABLE contactos (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(80), correo VARCHAR(80), telefono VARCHAR(20));
INSERT INTO contactos (nombre, correo, telefono) VALUES ('Ana López', 'ana@correo.com', '7777-1234');
SELECT * FROM contactos;
```

O desde la terminal:

```bash
docker compose exec db mysql -uusuario -pusuario123 contactos -e "SELECT * FROM contactos;"
```

**Prueba del volumen:** `docker compose down` → `docker compose up -d` → el registro **sigue ahí**.
Solo se borra con `docker compose down -v` (la `-v` elimina también los volúmenes).

🔎 Comprueba: `docker compose ps` con los 3 servicios, el login de Adminer, la tabla con datos y la prueba
de que siguen después de `down`/`up`.

---

## Preguntas típicas

- **¿Qué es Docker Compose?** → Herramienta para definir y ejecutar aplicaciones **multicontenedor** con un
  solo archivo YAML (`compose.yaml`) y un solo comando.
- **¿Dockerfile vs compose.yaml?** → El Dockerfile dice **cómo construir una imagen**. El compose.yaml dice
  **qué contenedores levantar y cómo se conectan** (puertos, volúmenes, variables, redes, orden).
- **¿`build` vs `image` en un servicio?** → `build` construye con tu Dockerfile (tu app). `image` usa una imagen
  ya hecha de Docker Hub (`mysql`, `adminer`, `nginx`...).
- **¿`stop` vs `down`?** → `stop` detiene y deja los contenedores (se reanudan con `start`/`up`). `down` los
  detiene y **elimina** junto con la red. `down -v` borra además los volúmenes (los datos).
- **¿`up` vs `up --build` vs `up -d`?** → `up` usa la imagen que ya existe; `--build` la reconstruye primero
  (cuando cambiaste el código o el Dockerfile); `-d` corre en segundo plano.
- **¿Para qué el volumen `.:/app`?** → Monta la carpeta del proyecto dentro del contenedor: lo que editas en
  VS Code se ve al instante sin reconstruir (modo desarrollo).
- **¿Y `/app/node_modules`?** → Protege las dependencias instaladas en la imagen para que el montaje anterior
  no las tape con la carpeta de Windows.
- **¿Volumen con nombre (`datos_db`) vs montaje de carpeta (`.:/app`)?** → El volumen con nombre lo administra
  Docker y sirve para **guardar datos** que no se pierden; el montaje de carpeta conecta archivos de tu PC.
- **¿Por qué el servidor es `db` y no `localhost`?** → Cada servicio es su propio contenedor; `localhost` dentro
  de Adminer es Adminer mismo. Compose crea una **red** (`carpeta_default`) donde cada servicio se encuentra
  por su **nombre**.
- **¿Por qué `db` no tiene `ports`?** → Solo la usan los otros servicios dentro de la red. Si quisieras entrar
  desde la PC (por ejemplo con MySQL Workbench), agregarías `ports: - "3306:3306"`.
- **¿`depends_on` espera a que la base esté lista?** → No: solo controla el **orden de arranque**. Por eso a
  veces la base tarda unos segundos más en aceptar conexiones.
- **¿`restart: unless-stopped`?** → Se reinicia solo si se cae o si reinicias Docker, salvo que tú lo hayas
  detenido. Otros valores: `no` (por defecto), `always`, `on-failure`.
- **Ventajas de Compose (de la guía):** control simplificado (todo en un YAML), colaboración (el archivo se
  comparte), desarrollo rápido (reutiliza contenedores que no cambiaron) y portabilidad entre entornos
  (admite variables, por ejemplo con un archivo `.env`).

---

## ✅ Checklist Guía 3

- [ ] `docker compose version`
- [ ] `compose.yaml` creado y sé explicar cada línea
- [ ] `docker compose up --build` → app en http://localhost:5173
- [ ] `docker compose ps`, `logs`, `exec`, `down` probados
- [ ] Actividad 4: `db` + `adminer`, conexión con servidor `db`, datos que sobreviven al `down`

---

## Solución (revisar después de intentarlo)

<details>
<summary>compose.yaml (solo la app, como la guía)</summary>

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: contenedor_con_compose
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped
```
</details>

<details>
<summary>compose.yaml (app + base de datos, Actividad 4)</summary>

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: contenedor_con_compose
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped

  db:
    image: mysql:8.4
    container_name: cm_db
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: contactos
      MYSQL_USER: usuario
      MYSQL_PASSWORD: usuario123
    volumes:
      - datos_db:/var/lib/mysql
    restart: unless-stopped

  adminer:
    image: adminer
    container_name: cm_adminer
    ports:
      - "8080:8080"
    depends_on:
      - db
    restart: unless-stopped

volumes:
  datos_db:
```

Si una app real se conectara (por ejemplo una API en Node), en su servicio iría:

```yaml
    environment:
      DB_HOST: db
      DB_USER: usuario
      DB_PASSWORD: usuario123
      DB_NAME: contactos
    depends_on:
      - db
```
</details>
