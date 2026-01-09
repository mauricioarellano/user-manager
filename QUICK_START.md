# 🚀 Quick Start Guide

Guía rápida para poner en marcha el sistema en menos de 5 minutos.

## Opción 1: Con Docker (Más Rápido) 🐳

```bash
# 1. Ejecutar script de instalación
./setup.sh

# 2. Seleccionar "Yes" cuando pregunte por Docker

# 3. Esperar a que los contenedores inicien

# 4. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

**Credenciales:**
- Admin: `admin@example.com` / `password`
- Usuario: `user@example.com` / `password`

## Opción 2: Manual ⚙️

### Terminal 1 - Backend

```bash
cd backend

# Instalar dependencias
composer install

# Configurar entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# Generar clave
php artisan key:generate

# Crear directorios
mkdir -p storage/framework/{sessions,views,cache}
chmod -R 775 storage bootstrap/cache

# Migrar base de datos
php artisan migrate

# Poblar datos de prueba
php artisan db:seed

# Iniciar servidor
php artisan serve
```

### Terminal 2 - Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

### Acceder

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

**Credenciales:**
- Admin: `admin@example.com` / `password`
- Usuario: `user@example.com` / `password`

## Verificación Rápida ✅

1. Abre http://localhost:3000
2. Inicia sesión con `admin@example.com` / `password`
3. Navega a "Usuarios"
4. Prueba crear, editar y eliminar usuarios
5. Prueba exportar a CSV

## Comandos Útiles 🛠️

### Backend
```bash
# Ver rutas
php artisan route:list

# Limpiar caché
php artisan cache:clear
php artisan config:clear

# Crear nuevo usuario admin desde consola
php artisan tinker
>>> $user = new App\Models\User();
>>> $user->name = "Admin";
>>> $user->email = "admin@test.com";
>>> $user->password = Hash::make("password");
>>> $user->role = "admin";
>>> $user->save();
```

### Frontend
```bash
# Build de producción
npm run build

# Ejecutar tests
npm test

# Limpiar caché
rm -rf node_modules package-lock.json
npm install
```

### Docker
```bash
# Ver logs
docker-compose logs -f

# Reiniciar
docker-compose restart

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

## Solución Rápida de Problemas 🔧

### No se puede conectar a la base de datos
```bash
# Verificar que PostgreSQL esté corriendo
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start
```

### Puerto 3000 ocupado
```bash
# Usar otro puerto
PORT=3001 npm start
```

### Puerto 8000 ocupado
```bash
# Usar otro puerto
php artisan serve --port=8080
```

### Error de permisos en storage
```bash
cd backend
chmod -R 775 storage bootstrap/cache
```

### Frontend no se conecta al backend
1. Verifica que el backend esté corriendo en puerto 8000
2. Revisa el proxy en `frontend/package.json`
3. Reinicia ambos servidores

## Próximos Pasos 📚

1. Lee `README.md` para descripción completa
2. Consulta `INSTALLATION.md` para instalación detallada
3. Revisa `PROJECT_SUMMARY.md` para arquitectura
4. Explora el código en `backend/` y `frontend/`

## Características Principales 🎯

- ✅ Login/Registro de usuarios
- ✅ CRUD completo de usuarios
- ✅ Control de roles (Admin/Usuario)
- ✅ Búsqueda y paginación
- ✅ Exportación a CSV
- ✅ Validación de formularios
- ✅ Protección XSS
- ✅ Interfaz moderna con Tailwind CSS

## Estructura de Archivos Importantes 📁

```
users/
├── backend/
│   ├── app/Http/Controllers/
│   │   ├── AuthController.php      # Login, registro
│   │   └── UserController.php      # CRUD usuarios
│   ├── routes/api.php              # Rutas de la API
│   └── database/seeders/           # Datos de prueba
│
├── frontend/
│   ├── src/
│   │   ├── pages/                  # Páginas principales
│   │   ├── components/             # Componentes reutilizables
│   │   ├── services/               # Servicios API
│   │   └── utils/                  # Utilidades
│   └── package.json
│
├── docker-compose.yml              # Configuración Docker
├── setup.sh                        # Script de instalación
└── README.md                       # Documentación
```

## Testing Rápido 🧪

### Probar API con curl

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Obtener usuarios (reemplaza TOKEN)
curl -X GET http://localhost:8000/api/users \
  -H "Authorization: Bearer TOKEN"
```

### Probar Frontend

1. Abre http://localhost:3000
2. Login con credenciales de prueba
3. Navega por las diferentes secciones
4. Prueba crear/editar/eliminar usuarios (como admin)

## Ayuda 💬

Si tienes problemas:

1. Revisa los logs:
   - Backend: `backend/storage/logs/laravel.log`
   - Frontend: Consola del navegador (F12)

2. Verifica que todos los servicios estén corriendo:
   ```bash
   # PostgreSQL
   sudo service postgresql status
   
   # Backend
   curl http://localhost:8000/api
   
   # Frontend
   curl http://localhost:3000
   ```

3. Consulta `INSTALLATION.md` para guía detallada

## ¡Listo! 🎉

Tu sistema de gestión de usuarios está funcionando. Explora las funcionalidades y personalízalo según tus necesidades.

**¿Necesitas más ayuda?** Consulta la documentación completa en los archivos README.

