# Quiz de teoría: Docker (Clase 1 + Guías 1, 2 y 3)

Versión interactiva: `quiz-docker.html` (ábrelo en el navegador). Aquí van las mismas preguntas con respuesta.

## 1. Subrayar la respuesta correcta

**1. Docker es principalmente…**

- a) Un sistema operativo ligero
- b) Una plataforma de código abierto para crear, empaquetar, distribuir y ejecutar aplicaciones en contenedores  ✅
- c) Un hipervisor que virtualiza hardware
- d) Un lenguaje para escribir microservicios

> Automatiza el despliegue de aplicaciones dentro de contenedores de software.

**2. A diferencia de una máquina virtual, un contenedor…**

- a) Incluye un sistema operativo huésped completo
- b) Necesita un hipervisor
- c) Comparte el kernel del sistema operativo anfitrión (host)  ✅
- d) Consume más CPU y RAM

> La VM virtualiza hardware y lleva su propio SO; el contenedor usa el del host a través de Docker Engine.

**3. Una imagen Docker es…**

- a) Una instancia en ejecución
- b) Una plantilla de solo lectura con las instrucciones para crear un contenedor  ✅
- c) Un volumen montado desde el host
- d) Un registro en la nube

> La instancia en ejecución es el contenedor.

**4. Un contenedor es…**

- a) Una instancia ejecutable de una imagen  ✅
- b) El archivo de texto con instrucciones
- c) El repositorio donde se guardan imágenes
- d) La API REST del daemon

> De una misma imagen se pueden crear muchos contenedores.

**5. Cada instrucción de un Dockerfile genera…**

- a) Un contenedor
- b) Una capa (layer) de la imagen  ✅
- c) Una red
- d) Un volumen

> Las capas se reutilizan (caché) y se comparten entre imágenes.

**6. ¿Qué instrucción indica la imagen base?**

- a) RUN
- b) WORKDIR
- c) FROM  ✅
- d) CMD

> FROM imagen:tag. Siempre es la primera.

**7. Si escribes FROM node sin tag, Docker usa…**

- a) La versión más antigua
- b) latest  ✅
- c) La versión instalada en tu PC
- d) Da error

> El tag por defecto es «latest».

**8. EXPOSE 5173…**

- a) Abre el puerto automáticamente en tu PC
- b) Documenta el puerto en que escucha el contenedor; se publica con -p  ✅
- c) Cambia el puerto de Vite
- d) Crea una red nueva

> Sin -p 5173:5173 en docker run (o ports en Compose) no llegas desde la PC.

**9. ¿Qué diferencia hay entre RUN y CMD?**

- a) Ninguna
- b) RUN se ejecuta al construir la imagen; CMD al iniciar el contenedor  ✅
- c) RUN al iniciar; CMD al construir
- d) CMD solo funciona en Compose

> Por eso npm install va con RUN y npm run dev con CMD.

**10. ¿Qué componente escucha las peticiones de la API y gestiona imágenes, contenedores, redes y volúmenes?**

- a) El cliente Docker
- b) El registro
- c) El daemon Docker  ✅
- d) Docker Hub

> El cliente (docker run, build…) envía peticiones a la API REST del daemon.

**11. El cliente y el daemon se comunican mediante…**

- a) Una API REST (por socket)  ✅
- b) FTP
- c) SQL
- d) Correo SMTP

> La comunicación puede hacerse con un socket de dominio.

**12. Docker Hub es…**

- a) Un IDE para escribir Dockerfiles
- b) Un registro en la nube para almacenar, compartir y descargar imágenes  ✅
- c) El motor que ejecuta contenedores
- d) Una extensión de VS Code

> Como «GitHub, pero para imágenes de Docker».

**13. ¿Qué nombre es correcto para subir a Docker Hub?**

- a) contact-manager@eniriel
- b) eniriel:contact-manager/v1
- c) eniriel/contact-manager:v1  ✅
- d) v1/contact-manager:eniriel

> usuario/imagen:tag

**14. docker push…**

- a) Descarga una imagen de Docker Hub
- b) Sube una imagen local a un repositorio de Docker Hub  ✅
- c) Ejecuta un contenedor
- d) Construye una imagen

> docker pull es el que descarga.

**15. Docker Compose es…**

- a) Un reemplazo del Dockerfile
- b) Una herramienta para definir y ejecutar aplicaciones multicontenedor con un archivo YAML  ✅
- c) Un registro privado
- d) Un comando para borrar imágenes

> Un archivo (compose.yaml) y un comando (docker compose up).

**16. docker compose down…**

- a) Solo detiene los contenedores
- b) Detiene y elimina los contenedores y la red  ✅
- c) Borra las imágenes
- d) Reconstruye la imagen

> docker compose stop solo detiene. down -v borra además los volúmenes.

**17. En ports: "8080:5173", el 8080 es…**

- a) El puerto del contenedor
- b) El puerto de tu PC (host)  ✅
- c) El puerto de Docker Hub
- d) El ID del contenedor

> host : contenedor. Abrirías http://localhost:8080.

**18. ¿Qué archivo indica lo que NO se copia a la imagen?**

- a) .gitignore
- b) .dockerignore  ✅
- c) compose.yaml
- d) package.json

> Allí va node_modules: las dependencias se instalan dentro del contenedor.

**19. En el compose de la guía, el volumen /app/node_modules sirve para…**

- a) Borrar las dependencias
- b) Conservar las dependencias instaladas dentro del contenedor  ✅
- c) Subir node_modules a Docker Hub
- d) Compartir node_modules con la PC

> Evita que el montaje .:/app las tape con la carpeta de Windows.

**20. restart: unless-stopped significa…**

- a) Nunca se reinicia
- b) Se reinicia si se detiene inesperadamente, salvo que tú lo detengas  ✅
- c) Se reinicia cada minuto
- d) Solo se reinicia al reconstruir

> Otros valores: no, always, on-failure.

## 2. Pareo (trasladar el número)

### Instrucciones del Dockerfile

| # | Concepto | Definición |
|---|---|---|
| 1 | `FROM` | Indica la imagen base para las siguientes instrucciones |
| 2 | `WORKDIR` | Especifica el directorio de trabajo de las demás instrucciones |
| 3 | `COPY` | Añade archivos a la ruta indicada, solo los copia |
| 4 | `ADD` | Copia archivos y además extrae comprimidos y admite URLs remotas |
| 5 | `RUN` | Ejecuta un comando en una nueva capa al construir la imagen |
| 6 | `ENV` | Configura variables de entorno |
| 7 | `EXPOSE` | Indica el puerto en el que escucha el contenedor (se mapea con -p) |
| 8 | `CMD` | Valores por defecto al iniciar el contenedor; solo vale la última aparición |
| 9 | `ENTRYPOINT` | Fija el ejecutable; anula lo especificado con CMD |
| 10 | `HEALTHCHECK` | Comprueba periódicamente el estado del contenedor |

### Conceptos de la clase

| # | Concepto | Definición |
|---|---|---|
| 1 | `Contenedor de software` | Aplicaciones aisladas que se ejecutan sobre un mismo núcleo de SO, usando el del host |
| 2 | `Imagen` | Plantilla de solo lectura que el motor usa para crear y ejecutar un contenedor |
| 3 | `Host (anfitrión)` | Equipo que ofrece servicios a otros equipos conectados a la red |
| 4 | `Daemon Docker` | Escucha peticiones de la API y gestiona imágenes, contenedores, redes y volúmenes |
| 5 | `Cliente Docker` | Modo principal de interactuar con Docker; envía comandos como docker run a la API |
| 6 | `Registro` | Lugar donde se almacenan las imágenes, por ejemplo Docker Hub |
| 7 | `Máquina virtual` | Virtualiza hardware y ejecuta un SO completo sobre otro SO |
| 8 | `Socket` | Objeto de software que enlaza el lado del servidor con el del cliente |

### Comandos y su objetivo

| # | Concepto | Definición |
|---|---|---|
| 1 | `docker build -t app .` | Construir una imagen desde el Dockerfile |
| 2 | `docker run -p 5173:5173 app` | Crear y ejecutar un contenedor publicando un puerto |
| 3 | `docker ps -a` | Ver todos los contenedores, incluso detenidos |
| 4 | `docker images` | Listar las imágenes locales |
| 5 | `docker push` | Subir una imagen a Docker Hub |
| 6 | `docker pull` | Descargar una imagen de Docker Hub |
| 7 | `docker compose up --build` | Construir e iniciar todos los servicios del compose |
| 8 | `docker compose ps` | Listar los servicios de Compose y su estado |
| 9 | `docker compose logs -f` | Seguir los registros de los servicios |
| 10 | `docker exec -it web sh` | Entrar a la terminal de un contenedor (Alpine) |

## 3. Verdadero o falso

1. Los contenedores necesitan un hipervisor para ejecutarse. → **F**. Eso lo necesitan las máquinas virtuales. Los contenedores corren sobre Docker Engine y comparten el kernel del host.
2. Se pueden crear varios contenedores a partir de una misma imagen. → **V**. La imagen es la plantilla; cada contenedor es una instancia.
3. EXPOSE publica el puerto hacia tu computadora. → **F**. Solo documenta el puerto. Se publica con -p en docker run o con ports en Compose.
4. Si un Dockerfile tiene dos CMD, solo tiene validez el último. → **V**. Así lo indica la tabla de comandos de la clase.
5. ADD y COPY hacen exactamente lo mismo. → **F**. ADD además extrae archivos comprimidos y acepta URLs remotas; COPY solo copia.
6. RUN se ejecuta cada vez que arranca el contenedor. → **F**. RUN se ejecuta al construir la imagen. Lo que corre al arrancar es CMD.
7. Las imágenes Docker son plantillas de solo lectura. → **V**. Lo que cambia es el contenedor en ejecución, no la imagen.
8. Un mismo cliente Docker puede comunicarse con varios daemons. → **V**. Dato de la clase (arquitectura cliente–daemon–registro).
9. Docker Hub solo permite repositorios públicos. → **F**. Permite públicos (cualquiera descarga) y privados (solo tú o quien autorices).
10. docker pull sube una imagen a Docker Hub. → **F**. pull descarga; push sube.
11. docker ps muestra también los contenedores detenidos. → **F**. Solo los que están corriendo. Para todos: docker ps -a.
12. docker compose down borra los datos guardados en volúmenes con nombre. → **F**. Los volúmenes se conservan. Solo se borran con docker compose down -v.
13. Docker Compose funciona en producción, desarrollo, pruebas y en integración continua (CI). → **V**. La guía lo menciona: funciona en todos los entornos.
14. Dentro de Compose, una app se conecta a la base de datos usando localhost. → **F**. Usa el nombre del servicio (por ejemplo db): Compose pone a los servicios en la misma red.
15. node_modules debe ir en .dockerignore. → **V**. Las dependencias se instalan dentro del contenedor con npm install.
16. Al reiniciar un servicio que no cambió, Compose reutiliza el contenedor existente. → **V**. Es la ventaja de «desarrollo rápido de aplicaciones».

## 4. Preguntas abiertas

### 1. ¿Qué es Docker y qué problema resuelve?

Docker es una plataforma de código abierto que empaqueta una aplicación con todas sus dependencias (librerías, herramientas, configuración, entorno de ejecución) en un contenedor portable. Resuelve el problema de «en mi máquina funciona»: el contenedor se ejecuta igual en cualquier equipo, servidor o nube que tenga Docker.

Puntos clave: Plataforma de código abierto · Empaqueta app + dependencias en un contenedor · «En mi máquina funciona» · Se ejecuta igual en cualquier entorno

### 2. Explica la diferencia entre una máquina virtual y un contenedor.

La máquina virtual virtualiza hardware: sobre un hipervisor corre un sistema operativo huésped completo por cada aplicación, por eso es pesada, lenta de arrancar y consume mucha CPU, RAM y disco. El contenedor no lleva SO propio: comparte el kernel del SO anfitrión mediante Docker Engine y solo agrega las bibliotecas que la app necesita; es ligero y arranca en segundos. Ejemplo: VM = tener 5 PCs dentro de tu PC; Docker = varias apps independientes dentro de tu PC.

Puntos clave: VM: hipervisor + SO huésped completo · Contenedor: comparte el kernel del host (Docker Engine) · Rendimiento y recursos · Ejemplo de las 5 PCs

### 3. ¿Qué relación hay entre Dockerfile, imagen y contenedor?

El Dockerfile es un archivo de texto plano con instrucciones (FROM, COPY, RUN, CMD…). Con docker build se convierte en una imagen: una plantilla de solo lectura formada por capas, una por instrucción. Con docker run la imagen se convierte en un contenedor: la instancia en ejecución. De una imagen se pueden crear muchos contenedores.

Puntos clave: Dockerfile → build → imagen → run → contenedor · Imagen = plantilla de solo lectura por capas · Contenedor = instancia ejecutable

### 4. Describe la arquitectura de Docker: cliente, daemon y registro.

El cliente es lo que usamos (docker build, pull, run): envía peticiones a la API REST del daemon. El daemon, en el Docker host, escucha esas peticiones y gestiona imágenes, contenedores, redes y volúmenes. El registro (como Docker Hub) almacena las imágenes; si al hacer run la imagen no está en el host, el daemon la descarga (pull) del registro y luego crea el contenedor.

Puntos clave: Cliente → API REST → daemon · Daemon gestiona imágenes, contenedores, redes, volúmenes · Registro almacena imágenes (Docker Hub)

### 5. ¿Qué es Docker Hub y para qué sirven los tags?

Docker Hub es un registro en la nube de Docker Inc. para almacenar, compartir y descargar imágenes, con repositorios públicos y privados e imágenes oficiales (node, nginx, mysql). Los tags identifican versiones de una imagen (v1, v2, latest) para manejar distintas versiones de la app. Se sube con docker push usuario/imagen:tag y se descarga con docker pull usuario/imagen:tag.

Puntos clave: Registro en la nube · Público / privado / oficiales · Tags = versiones (por defecto latest) · push / pull

### 6. ¿Qué es Docker Compose y cuáles son sus ventajas?

Es una herramienta para definir y ejecutar aplicaciones multicontenedor en un único archivo YAML (compose.yaml) y levantarlas con un solo comando. Ventajas: control simplificado (todo en un archivo), colaboración eficiente (el YAML se comparte entre desarrollo y operaciones), desarrollo rápido (reutiliza contenedores que no cambiaron) y portabilidad entre entornos (admite variables).

Puntos clave: Multicontenedor con un YAML · Control simplificado · Colaboración · Desarrollo rápido (caché) · Portabilidad (variables)

### 7. Explica cada parte del compose.yaml de la guía 3.

services define los contenedores; app es el nombre del servicio; build con context: . y dockerfile: Dockerfile construye la imagen desde la carpeta actual; container_name le da nombre al contenedor; ports "5173:5173" conecta el puerto de la PC con el del contenedor; volumes .:/app sincroniza el proyecto con /app y /app/node_modules conserva las dependencias del contenedor; restart: unless-stopped lo reinicia si se detiene inesperadamente.

Puntos clave: services / app · build: context y dockerfile · container_name · ports host:contenedor · volumes (.:/app y /app/node_modules) · restart

### 8. ¿Qué cambios necesita una aplicación para conectarse a una base de datos dentro de Docker Compose?

Agregar un servicio para la base de datos con su imagen oficial (por ejemplo mysql:8.4); definir variables de entorno con usuario, contraseña y nombre de la base; un volumen con nombre para que los datos persistan después de down; depends_on para que la app arranque después de la base; y conectarse usando el nombre del servicio (db) como servidor en lugar de localhost, porque Compose crea una red donde cada servicio se encuentra por su nombre.

Puntos clave: Servicio db con image · environment (usuario, contraseña, base) · Volumen para persistir · depends_on · Host = nombre del servicio, no localhost

### 9. ¿Cuáles son las principales ventajas de usar Docker?

Consistencia (la app corre igual en desarrollo y producción), portabilidad (se mueve entre máquinas y nubes sin problemas), modularidad y escalabilidad (microservicios que se empaquetan y escalan por separado) y eficiencia (más ligero que una VM porque no necesita un SO completo). También aislamiento (sin conflictos de versiones) y rapidez (arranca en segundos).

Puntos clave: Consistencia · Portabilidad · Modularidad y escalabilidad · Eficiencia · Aislamiento y rapidez

### 10. ¿Por qué en el Dockerfile se copia package*.json antes de COPY . . y para qué sirve .dockerignore?

Cada instrucción es una capa en caché. Si se copian primero solo las dependencias y luego se hace npm install, cuando cambias el código pero no las dependencias Docker reutiliza la capa de npm install y el build es mucho más rápido. El .dockerignore indica qué no copiar a la imagen (node_modules, logs, archivos del editor), lo que la hace más liviana y evita meter dependencias de la PC.

Puntos clave: Capas y caché · npm install no se repite si no cambian dependencias · .dockerignore excluye node_modules, logs…

### 11. Actividad de clase: ¿qué necesita realmente una aplicación para funcionar en otra computadora?

Las versiones necesarias (por ejemplo Node 24), las librerías y dependencias (las de package.json), las configuraciones (puertos, variables de entorno), un sistema operativo compatible y las bases de datos u otros servicios que use. Docker empaqueta todo eso en la imagen para que no dependa de lo que tenga instalada la otra PC.

Puntos clave: Versiones · Librerías y dependencias · Configuraciones · Sistema operativo · Bases de datos u otros servicios

### 12. ¿Qué ventajas tiene Docker frente a gestores de paquetes, herramientas de configuración y máquinas virtuales?

Frente a gestores de paquetes (RPM, DPKG): no hay que instalar dependencias por separado ni pelear con versiones, todo va en una imagen. Frente a herramientas de configuración (Ansible, Puppet…): no hacen falta, la imagen ya es autocontenida y corre igual en distintos entornos. Frente a VMs: Docker es más ligero, rápido y eficiente, aunque pierde algo de aislamiento y seguridad.

Puntos clave: Paquetes: todo en una imagen · Configuración: imagen autocontenida · VM: más ligero; algo menos aislado

## 5. Corrige el comando

| Objetivo | Con error | Correcto | Por qué |
|---|---|---|---|
| Construir la imagen «mi-app» | `docker build -t mi-app` | `docker build -t mi-app .` | Falta el punto final: el contexto de construcción (carpeta actual). |
| Ejecutar y abrir en http://localhost:5173 | `docker run -p 5173 mi-app` | `docker run -it -p 5173:5173 mi-app` | El mapeo es puerto_PC:puerto_contenedor. |
| Subir la imagen a Docker Hub | `docker push mi-app:v1` | `docker push eniriel/mi-app:v1` | Debe empezar con tu usuario (y antes haber hecho docker tag o build con ese nombre). |
| Construir la imagen «Mi-App» | `docker build -t Mi-App .` | `docker build -t mi-app .` | Los nombres de imagen van en minúsculas. |
| Entrar a un contenedor basado en node:24-alpine | `docker exec -it web /bin/bash` | `docker exec -it web sh` | Alpine no trae bash; se usa sh. |
| Construir e iniciar con Compose | `docker compose up -build` | `docker compose up --build` | Las opciones largas llevan dos guiones. |
| Borrar el contenedor «web» que está corriendo | `docker rm web` | `docker stop web   y luego   docker rm web` | rm no borra uno en ejecución. También: docker rm -f web. |
| Ver los logs del contenedor «web» | `docker logs -ft` | `docker logs -ft web` | Falta el nombre (o ID) del contenedor. |
| CMD para que Vite sea accesible desde la PC | `CMD ["npm", "run", "dev"]` | `CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]` | Sin --host 0.0.0.0 Vite solo escucha dentro del contenedor. |
| Ver los contenedores de Compose | `docker compose up ps` | `docker compose ps` | up inicia; ps lista. |
| Detener Compose y borrar también los datos de la base | `docker compose down` | `docker compose down -v` | -v elimina los volúmenes. |
| Descargar la versión 2 | `docker pull eniriel/mi-app` | `docker pull eniriel/mi-app:v2` | Sin tag descarga latest, no v2. |
