# Guía de Instalación - User Management System

Esta guía te ayudará a instalar y configurar el sistema de gestión de usuarios paso a paso.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Rápida con Docker](#instalación-rápida-con-docker)
3. [Instalación Manual](#instalación-manual)
4. [Configuración de Base de Datos](#configuración-de-base-de-datos)
5. [Verificación](#verificación)
6. [Solución de Problemas](#solución-de-problemas)

## Requisitos Previos

### Opción 1: Con Docker (Recomendado)
- Docker >= 20.10
- Docker Compose >= 2.0

### Opción 2: Manual
- PHP >= 8.0
- Composer >= 2.0
- Node.js >= 14
- npm >= 6
- PostgreSQL >= 12 o MariaDB >= 10.3

### Extensiones PHP Requeridas
- pdo_pgsql (para PostgreSQL) o pdo_mysql (para MariaDB)
- mbstring
- openssl
- tokenizer
- xml
- ctype
- json
- bcmath

## Instalación Rápida con Docker

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd users
```

### 2. Ejecutar Script de Instalación

```bash
./setup.sh
```

Selecciona "Yes" cuando se te pregunte si quieres usar Docker.

### 3. Acceder a la Aplicación

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432

**Credenciales por defecto:**
- Admin: `admin@example.com` / `password`
- Usuario: `user@example.com` / `password`

### Comandos Docker Útiles

```bash
# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ejecutar migraciones
docker-compose exec backend php artisan migrate

# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder al contenedor del frontend
docker-compose exec frontend sh
```

## Instalación Manual

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd users
```

### 2. Configurar Backend

#### a. Instalar Dependencias

```bash
cd backend
composer install
```

#### b. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
APP_NAME="User Management"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=user_management
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,127.0.0.1,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

#### c. Generar Clave de Aplicación

```bash
php artisan key:generate
```

#### d. Crear Directorios de Almacenamiento

```bash
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
mkdir -p bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

#### e. Ejecutar Migraciones

```bash
php artisan migrate
```

#### f. Poblar Base de Datos (Opcional)

```bash
php artisan db:seed
```

#### g. Iniciar Servidor

```bash
php artisan serve
```

El backend estará disponible en http://localhost:8000

### 3. Configurar Frontend

Abre una nueva terminal:

#### a. Instalar Dependencias

```bash
cd frontend
npm install
```

#### b. Iniciar Servidor de Desarrollo

```bash
npm start
```

El frontend estará disponible en http://localhost:3000

## Configuración de Base de Datos

### PostgreSQL

#### Instalación en Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### Crear Base de Datos

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE user_management;
CREATE USER postgres WITH PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE user_management TO postgres;
\q
```

#### Instalación en macOS (con Homebrew)

```bash
brew install postgresql
brew services start postgresql
createdb user_management
```

#### Instalación en Windows

1. Descargar PostgreSQL desde https://www.postgresql.org/download/windows/
2. Ejecutar el instalador
3. Usar pgAdmin para crear la base de datos

### MariaDB (Alternativa)

#### Instalación en Ubuntu/Debian

```bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```

#### Crear Base de Datos

```bash
sudo mysql
```

```sql
CREATE DATABASE user_management;
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON user_management.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Actualiza tu `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=user_management
DB_USERNAME=usuario
DB_PASSWORD=tu_contraseña
```

## Verificación

### 1. Verificar Backend

```bash
curl http://localhost:8000/api
```

Deberías ver una respuesta JSON con información de la API.

### 2. Verificar Frontend

Abre tu navegador en http://localhost:3000

Deberías ver la página de login.

### 3. Probar Login

Usa las credenciales por defecto:
- Email: `admin@example.com`
- Password: `password`

### 4. Verificar Funcionalidades

- ✅ Login/Logout
- ✅ Registro de usuarios
- ✅ Listado de usuarios
- ✅ Crear usuario (admin)
- ✅ Editar usuario (admin)
- ✅ Eliminar usuario (admin)
- ✅ Exportar CSV (admin)
- ✅ Búsqueda de usuarios
- ✅ Paginación

## Solución de Problemas

### Error: "SQLSTATE[08006] [7] could not connect to server"

**Problema:** No se puede conectar a PostgreSQL

**Solución:**
1. Verifica que PostgreSQL esté corriendo:
   ```bash
   sudo service postgresql status
   ```
2. Verifica las credenciales en `.env`
3. Verifica que el puerto 5432 esté abierto

### Error: "Class 'PDO' not found"

**Problema:** Extensión PDO no instalada

**Solución:**
```bash
sudo apt install php-pdo php-pgsql
# o para MySQL
sudo apt install php-pdo php-mysql
```

### Error: "npm ERR! EACCES: permission denied"

**Problema:** Permisos de npm

**Solución:**
```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER node_modules
```

### Error: "Port 3000 is already in use"

**Problema:** Puerto ocupado

**Solución:**
```bash
# Encontrar proceso usando el puerto
lsof -i :3000
# Matar el proceso
kill -9 <PID>
```

O usa otro puerto:
```bash
PORT=3001 npm start
```

### Error: "CSRF token mismatch"

**Problema:** Configuración de CORS/Sanctum

**Solución:**
1. Verifica `SANCTUM_STATEFUL_DOMAINS` en `.env`
2. Limpia caché:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

### Error: "Composer dependencies out of date"

**Problema:** Dependencias desactualizadas

**Solución:**
```bash
cd backend
composer update
```

### Frontend no se conecta al Backend

**Problema:** Configuración de proxy

**Solución:**
1. Verifica que el backend esté corriendo en puerto 8000
2. Verifica el proxy en `frontend/package.json`:
   ```json
   "proxy": "http://localhost:8000"
   ```
3. Reinicia el servidor de desarrollo

## Configuración Adicional

### Cambiar Puerto del Backend

Edita `backend/.env`:
```env
APP_URL=http://localhost:8080
```

Inicia con:
```bash
php artisan serve --port=8080
```

### Cambiar Puerto del Frontend

```bash
PORT=3001 npm start
```

### Habilitar Debug

Backend (`backend/.env`):
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

### Configurar Email (Opcional)

Para notificaciones por email, configura en `backend/.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_contraseña
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu_email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Próximos Pasos

1. Cambia las credenciales por defecto
2. Configura backups de base de datos
3. Revisa la documentación de la API
4. Personaliza los estilos del frontend
5. Implementa features adicionales

## Soporte

Si encuentras problemas no cubiertos en esta guía:

1. Revisa los logs:
   - Backend: `backend/storage/logs/laravel.log`
   - Frontend: Consola del navegador
2. Busca en los issues del repositorio
3. Crea un nuevo issue con detalles del problema

## Recursos Adicionales

- [Documentación de Laravel](https://laravel.com/docs)
- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)

