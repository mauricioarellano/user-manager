# User Management API - Backend

API REST desarrollada con Laravel para gestión de usuarios con autenticación y control de roles.

## Características

- ✅ CRUD completo de usuarios
- ✅ Autenticación con Laravel Sanctum
- ✅ Sistema de roles (admin/user)
- ✅ Middleware de verificación de roles
- ✅ Exportación de usuarios a CSV
- ✅ Paginación de resultados
- ✅ Validación de datos
- ✅ Protección CSRF
- ✅ Base de datos PostgreSQL

## Requisitos

- PHP >= 8.0
- Composer
- PostgreSQL >= 12
- Extensiones PHP: pdo_pgsql, mbstring, openssl, tokenizer, xml, ctype, json

## Instalación

1. **Instalar dependencias:**
```bash
composer install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Editar `.env` y configurar la base de datos:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=user_management
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
```

3. **Generar clave de aplicación:**
```bash
php artisan key:generate
```

4. **Ejecutar migraciones:**
```bash
php artisan migrate
```

5. **Poblar base de datos (opcional):**
```bash
php artisan db:seed
```

Esto creará:
- Admin: admin@example.com / password
- Usuario: user@example.com / password
- 20 usuarios de prueba adicionales

6. **Iniciar servidor:**
```bash
php artisan serve
```

La API estará disponible en `http://localhost:8000`

## Endpoints de la API

### Autenticación

- `POST /api/register` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión (requiere autenticación)
- `GET /api/me` - Obtener usuario autenticado

### Usuarios

- `GET /api/users` - Listar usuarios (con paginación y búsqueda)
- `GET /api/users/{id}` - Obtener usuario por ID
- `POST /api/users` - Crear usuario (solo admin)
- `PUT /api/users/{id}` - Actualizar usuario (solo admin)
- `DELETE /api/users/{id}` - Eliminar usuario (solo admin)
- `GET /api/users/export/csv` - Exportar usuarios a CSV (solo admin)

## Ejemplos de uso

### Registro
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

### Listar usuarios (con token)
```bash
curl -X GET http://localhost:8000/api/users?page=1&per_page=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Estructura del Proyecto

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── UserController.php
│   │   └── Middleware/
│   │       └── CheckRole.php
│   └── Models/
│       └── User.php
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php
│   └── web.php
└── storage/
```

## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens de autenticación con Laravel Sanctum
- Validación de datos en todas las peticiones
- Protección CSRF
- Middleware de roles para rutas protegidas
- Sanitización de entradas

## Testing

```bash
php artisan test
```

## Licencia

MIT

