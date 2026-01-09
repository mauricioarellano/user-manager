# User Management - Frontend

Aplicación web desarrollada con React y TypeScript para gestión de usuarios con autenticación y control de roles.

## Características

- ✅ Interfaz moderna con Tailwind CSS
- ✅ Autenticación de usuarios
- ✅ CRUD completo de usuarios
- ✅ Paginación de resultados
- ✅ Búsqueda de usuarios
- ✅ Validación de formularios en frontend
- ✅ Protección contra XSS
- ✅ Exportación a CSV
- ✅ Control de acceso basado en roles
- ✅ Diseño responsive

## Requisitos

- Node.js >= 14
- npm o yarn
- Backend API corriendo en `http://localhost:8000`

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno (opcional):**

El frontend está configurado para usar el proxy hacia `http://localhost:8000`. Si necesitas cambiar esto, edita `package.json`:

```json
"proxy": "http://localhost:8000"
```

3. **Iniciar servidor de desarrollo:**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Crea la versión de producción
- `npm test` - Ejecuta los tests
- `npm run eject` - Expone la configuración de webpack (irreversible)

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Pagination.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── UserModal.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Users.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── sanitize.ts
│   │   └── validation.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Características de Seguridad

### Protección XSS

La aplicación implementa múltiples capas de protección contra XSS:

1. **Sanitización de Entradas**: Todos los inputs del usuario son sanitizados antes de ser procesados
2. **Escape de HTML**: Los caracteres especiales son escapados automáticamente
3. **React por Defecto**: React escapa automáticamente el contenido renderizado
4. **Validación de Datos**: Validación estricta en el frontend antes de enviar al backend

### Validaciones

- Email: Formato válido de email
- Contraseña: Mínimo 8 caracteres
- Nombre: Mínimo 2 caracteres
- Teléfono: Formato válido (opcional)
- Confirmación de contraseña: Debe coincidir

## Uso

### Login

1. Navega a `/login`
2. Ingresa tus credenciales:
   - Admin: `admin@example.com` / `password`
   - Usuario: `user@example.com` / `password`
3. Serás redirigido al dashboard

### Registro

1. Navega a `/register`
2. Completa el formulario
3. Serás redirigido al dashboard automáticamente

### Gestión de Usuarios

**Todos los usuarios autenticados pueden:**
- Ver lista de usuarios
- Buscar usuarios
- Ver detalles de usuarios

**Solo administradores pueden:**
- Crear nuevos usuarios
- Editar usuarios existentes
- Eliminar usuarios
- Exportar usuarios a CSV

### Paginación

- La lista de usuarios muestra 10 registros por página por defecto
- Usa los controles de paginación para navegar entre páginas
- La paginación se mantiene al realizar búsquedas

### Búsqueda

- Busca por nombre, email o teléfono
- La búsqueda es sensible a mayúsculas/minúsculas
- Los resultados se actualizan automáticamente

### Exportar CSV

1. Haz clic en "Exportar CSV" (solo admin)
2. El archivo se descargará automáticamente
3. Incluye todos los usuarios (no solo la página actual)

## Tecnologías Utilizadas

- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Context API** - Gestión de estado

## Desarrollo

### Agregar Nuevas Páginas

1. Crea el componente en `src/pages/`
2. Agrega la ruta en `src/App.tsx`
3. Usa `PrivateRoute` si requiere autenticación

### Agregar Nuevos Servicios

1. Crea el servicio en `src/services/`
2. Usa la instancia de `api` configurada
3. Define los tipos en `src/types/`

### Estilos

El proyecto usa Tailwind CSS. Para personalizar:

1. Edita `tailwind.config.js`
2. Usa clases de utilidad en los componentes
3. Los estilos personalizados van en `src/index.css`

## Build para Producción

```bash
npm run build
```

Esto creará una carpeta `build/` con los archivos optimizados listos para desplegar.

## Despliegue

La aplicación puede desplegarse en:

- **Vercel**: `vercel --prod`
- **Netlify**: Arrastra la carpeta `build/`
- **GitHub Pages**: Usa `gh-pages`
- **Servidor propio**: Sirve la carpeta `build/` con nginx o apache

Recuerda configurar las variables de entorno para apuntar al backend en producción.

## Licencia

MIT

