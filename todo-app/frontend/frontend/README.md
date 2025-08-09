# 📝 ToDo List App

Una aplicación completa de gestión de tareas con frontend en React y backend en Node.js con Express y MySQL.

## 🚀 Características

- ✅ Crear, editar y eliminar tareas
- 🔄 Marcar tareas como completadas/pendientes
- 🔍 Filtrar tareas por estado (todas, completadas, pendientes)
- 📅 Fechas de vencimiento
- 🎯 Niveles de prioridad (baja, media, alta)
- 💾 Persistencia en base de datos MySQL
- 📱 Diseño responsivo y moderno
- ⚡ Validaciones en frontend y backend
- 🛡️ Manejo de errores robusto

## 🛠️ Tecnologías

**Frontend:**
- React 18 con Hooks
- Axios para HTTP requests
- Lucide React para iconos
- CSS moderno con efectos glassmorphism

**Backend:**
- Node.js con Express
- Sequelize ORM
- MySQL
- Express Validator para validaciones
- CORS para manejo de cross-origin

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- MySQL Server
- npm o yarn

## 🔧 Instalación

### 1. Configurar la Base de Datos

```sql
CREATE DATABASE todo_db;
```

### 2. Backend Setup

```bash
# Crear directorio del proyecto
mkdir todo-app
cd todo-app
mkdir backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Frontend Setup

```bash
# En una nueva terminal, desde el directorio raíz
cd frontend

# Instalar dependencias
npm install

# Iniciar aplicación React
npm start
```

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/todos` | Obtener todas las tareas |
| GET | `/api/todos/:id` | Obtener tarea por ID |
| POST | `/api/todos` | Crear nueva tarea |
| PUT | `/api/todos/:id` | Actualizar tarea |
| PATCH | `/api/todos/:id/toggle` | Cambiar estado de completado |
| DELETE | `/api/todos/:id` | Eliminar tarea |

### Parámetros de consulta para GET /api/todos:
- `status`: `all`, `completed`, `pending`
- `priority`: `low`, `medium`, `high`
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 10)

## 📝 Estructura del Proyecto

```
todo-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── TodoForm.js
    │   │   ├── TodoList.js
    │   │   ├── TodoItem.js
    │   │   ├── FilterTabs.js
    │   │   ├── ErrorMessage.js
    │   │   └── LoadingSpinner.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🔑 Variables de Entorno

Crear archivo `.env` en el directorio backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=todo_db
DB_USER=root
DB_PASSWORD=tu_password
PORT=5000
NODE_ENV=development
```

## 🎯 Uso

1. **Agregar tarea:** Completa el formulario y haz clic en "Add Task"