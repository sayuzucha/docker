
# Proyecto Microservicios con Docker Compose - Sayuri

## Objetivo
Diseñar e implementar una arquitectura de microservicios utilizando Docker Compose: frontend, backend (API) y base de datos con persistencia.

## Estructura del repositorio
- `docker-compose.yml` - define los 3 servicios: db_zuniga, backend_sayuri, frontend_sayuri
- `backend/` - código fuente del API (Node.js + Express + pg)
- `frontend/` - servidor estático Node.js que sirve el frontend (HTML + JS)
- `volumes` - volumen Docker named `sayuri_db_data` para persistencia

## Requisitos técnicos cumplidos (resumen)
- Frontend: servido por un Dockerfile propio (no nginx). Muestra el nombre "Sayuri" en el frontend.
- Backend: API Node.js, conecta con PostgreSQL. Endpoint `/api/zuniga` devuelve el nombre completo.
- DB: PostgreSQL con volumen explícito `sayuri_db_data`.
- Redes: red interna `micro_net` permite comunicación por nombre de servicio.
- `depends_on` establece orden de arranque entre servicios.
- Pruebas: CRUD en `/api/items` y persistencia verificada en volumen.

## Cómo levantar el entorno (en una instancia EC2 con Docker & Docker Compose instalados)
1. Clona el repositorio (reemplaza `<TU_REPO_URL>` por tu repo):
   ```bash
   git clone <TU_REPO_URL>
   cd microservices_sayuri_project
   ```
2. Levanta los contenedores:
   ```bash
   docker compose up -d --build
   ```
3. Abre el frontend en el navegador apuntando al IP pública de la instancia EC2 (puerto 80).
   - Asegúrate de que el Security Group permita el tráfico HTTP (puerto 80) y el puerto 5000 si quieres acceder a la API directamente.
4. Usa el frontend para probar `/api/zuniga` y CRUD en `Items`.

## Notas sobre despliegue en AWS EC2
- Crea una instancia (Amazon Linux 2 o Ubuntu 22.04), abre puertos 22 (SSH), 80 (HTTP) y 5000 (API) en el Security Group.
- Instala Docker y Docker Compose (ej.: `sudo apt update && sudo apt install docker.io docker-compose -y` en Ubuntu; añade tu usuario a `docker` o usa `sudo`).
- Clona el repo, y ejecuta `docker compose up -d --build`.
- Los datos se mantienen en el volumen `sayuri_db_data` incluso si reinicias los contenedores o la instancia (mientras el volumen no sea borrado).

## Diagramas y flujo de datos (Mermaid)
```mermaid
flowchart LR
  subgraph EC2_Instance
    F[Frontend - frontend_sayuri]
    B[Backend - backend_sayuri]
    DB[(PostgreSQL - sayuri_db)]
  end
  F -->|HTTP (fetch) host:5000| B
  B -->|SQL queries| DB
```
## URL del repositorio GitHub
___REEMPLAZAR_POR_TU_REPO___

---
Si quieres, puedo:
- Crear el repositorio GitHub inicial con estos archivos y darte la URL (necesitaría permiso para usar tus credenciales/GitHub, o te doy los pasos manuales).
- Generar un archivo ZIP con el proyecto listo para subir a GitHub o desplegar en EC2. 
