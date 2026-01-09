# User Management System - Sistema de Gestión de Usuarios

Sistema completo de gestión de usuarios con autenticación, control de roles y exportación de datos. Desarrollado con Laravel (backend) y React + TypeScript (frontend).

## 🚀 Características Principales

### Backend (Laravel)
- ✅ API REST completa
- ✅ Autenticación con Laravel Sanctum
- ✅ Sistema de roles (Administrador/Usuario)
- ✅ Middleware de verificación de roles
- ✅ CRUD completo de usuarios
- ✅ Exportación a CSV
- ✅ Validación de datos
- ✅ Protección CSRF
- ✅ Base de datos PostgreSQL/MariaDB

### Frontend (React + TypeScript)
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Paginación de resultados
- ✅ Búsqueda de usuarios
- ✅ Validación de formularios
- ✅ Protección contra XSS
- ✅ Diseño responsive
- ✅ Context API para estado global
- ✅ TypeScript para tipado estático

## 📋 Requisitos del Sistema

### Backend
- PHP >= 8.0
- Composer
- PostgreSQL >= 12 o MariaDB >= 10.3
- Extensiones PHP: pdo_pgsql, mbstring, openssl, tokenizer, xml, ctype, json

### Frontend
- Node.js >= 14
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd users
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
composer install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de base de datos
nano .env

# Generar clave de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Poblar base de datos (opcional)
php artisan db:seed

# Iniciar servidor
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

**Credenciales por defecto:**
- Admin: `admin@example.com` / `password`
- Usuario: `user@example.com` / `password`

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El frontend estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
users/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   └── UserController.php
│   │   │   └── Middleware/
│   │   │       └── CheckRole.php
│   │   └── Models/
│   │       └── User.php
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── README.md
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   ├── contexts/       # Context API
    │   ├── pages/          # Páginas principales
    │   ├── services/       # Servicios API
    │   ├── types/          # Tipos TypeScript
    │   └── utils/          # Utilidades
    └── README.md
```

## 🔐 Seguridad

### Backend
- Contraseñas hasheadas con bcrypt
- Tokens de autenticación con Laravel Sanctum
- Validación de datos en todas las peticiones
- Protección CSRF
- Middleware de roles para rutas protegidas
- Sanitización de entradas

### Frontend
- Sanitización de inputs del usuario
- Escape de HTML para prevenir XSS
- Validación de formularios antes de enviar
- Tokens de autenticación en headers
- Rutas protegidas con PrivateRoute
- Context API para gestión segura del estado

## 📡 API Endpoints

### Autenticación
- `POST /api/register` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión (autenticado)
- `GET /api/me` - Obtener usuario autenticado

### Usuarios
- `GET /api/users` - Listar usuarios (paginado, con búsqueda)
- `GET /api/users/{id}` - Obtener usuario por ID
- `POST /api/users` - Crear usuario (solo admin)
- `PUT /api/users/{id}` - Actualizar usuario (solo admin)
- `DELETE /api/users/{id}` - Eliminar usuario (solo admin)
- `GET /api/users/export/csv` - Exportar usuarios a CSV (solo admin)

## 🎨 Capturas de Pantalla

### Login
Página de inicio de sesión con validación de formularios.

### Dashboard
Panel principal con resumen de información del usuario.

### Gestión de Usuarios
Lista de usuarios con paginación, búsqueda y acciones CRUD (solo admin).

### Crear/Editar Usuario
Modal con formulario validado para crear o editar usuarios.

## 🧪 Testing

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
npm test
```

## 🚀 Despliegue

### Backend (Laravel)

**Opción 1: Servidor tradicional**
1. Configurar servidor web (Apache/Nginx)
2. Configurar PHP-FPM
3. Configurar base de datos
4. Ejecutar migraciones
5. Configurar variables de entorno

**Opción 2: Docker**
```bash
cd backend
docker-compose up -d
```

### Frontend (React)

**Build de producción:**
```bash
cd frontend
npm run build
```

**Desplegar en:**
- Vercel: `vercel --prod`
- Netlify: Arrastra la carpeta `build/`
- GitHub Pages: Usa `gh-pages`
- Servidor propio: Sirve la carpeta `build/`

## 📝 Variables de Entorno

### Backend (.env)
```env
APP_NAME="User Management"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://tu-dominio.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=user_management
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña

SANCTUM_STATEFUL_DOMAINS=tu-dominio.com
SESSION_DOMAIN=tu-dominio.com
```

### Frontend
Edita `package.json` para cambiar el proxy del backend:
```json
"proxy": "https://tu-api.com"
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- Desarrollador Principal - Sistema de Gestión de Usuarios

## 🙏 Agradecimientos

- Laravel Framework
- React Team
- Tailwind CSS
- Comunidad Open Source

## 📞 Soporte

Para reportar bugs o solicitar features, por favor abre un issue en el repositorio.

---

**Nota:** Este es un proyecto de demostración. Para uso en producción, asegúrate de:
- Cambiar todas las credenciales por defecto
- Configurar HTTPS
- Implementar rate limiting
- Configurar backups de base de datos
- Implementar logging y monitoreo
- Revisar y actualizar dependencias regularmente

