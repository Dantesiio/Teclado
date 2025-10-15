# Teclado

Aplicación estática de práctica de mecanografía. El contenido se publica dentro del stack Docker del host Jenkins mediante un contenedor Nginx, pero también puede ejecutarse de forma local para desarrollo.

## Estructura

- `index.html`, `script.js`, `css/`: código de la aplicación web.
- `Dockerfile`: imagen mínima basada en `nginx:alpine` que sirve la aplicación.
- `Jenkinsfile`: pipeline de ejemplo para ejecutar análisis SonarQube desde Jenkins.
- `sonar-project.properties`: configuración del scanner para SonarQube.

## Requisitos opcionales

- Node.js 18+ si deseas utilizar los scripts de `package.json`.
- Docker si quieres construir la imagen localmente.

## Ejecutar en local (modo desarrollo)

```bash
cd Teclado
npm install
npm run serve
# abrir http://localhost:8080
```

> El comando usa `http-server` vía `npx`. Si prefieres otro servidor estático, simplemente abre `index.html` en tu navegador.

## Construir imagen Docker

```bash
cd Teclado
docker build -t teclado:latest .
docker run --rm -p 8080:80 teclado:latest
# abrir http://localhost:8080
```

## Integración con el stack del taller

- El playbook de `ansible-pipeline` sincroniza el contenido de esta carpeta dentro de `/opt/devops/jenkins/teclado/site/` en la VM Jenkins.
- El servicio `teclado` del `docker-compose.yml` monta esa ruta y expone el sitio en el puerto 80 de la IP pública.
- Cualquier cambio que hagas aquí se desplegará al ejecutar de nuevo el playbook.

## CI con Jenkins + SonarQube

- Jenkins: job Freestyle / Pipeline que clona este repo y ejecuta SonarScanner.
- Requisitos en Jenkins:
  - Plugin **SonarQube Scanner for Jenkins**, **NodeJS**, **Git**, (opcional) **GitHub**.
  - Tools: **SonarScanner** (Install automatically) y **Node18** (Install automatically).
  - System: servidor Sonar `sonarqube` apuntando a `http://74.235.240.17:9000` con credencial de token.
- Triggers:
  - O **Poll SCM** (`H/2 * * * *`) o **GitHub webhook** a `/github-webhook/`.
- Quality Gate:
  - Se exige 100% de *Security Hotspots Reviewed* en New Code. El único hotspot (uso de `Math.random()` en `script.js`) se marca como **Safe** al ser uso no criptográfico.
