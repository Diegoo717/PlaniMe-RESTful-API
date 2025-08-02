# PlaniMe RESTful API 🌐

Una API RESTful robusta desarrollada con Node.js, Express y Sequelize sobre MySQL, que proporciona servicios de backend para la gestión de planes nutricionales personalizados con arquitectura modular y seguridad avanzada.

🔗 **[API en Producción](https://planime-rest-api.diecode.lat/)**

## 📋 Descripción

PlaniMe RESTful API es el backend robusto de PlaniMe, desarrollado con Node.js, Express y Sequelize sobre MySQL. Implementa controladores modulares, validación de datos, middleware para autenticación y autorización JWT, expone endpoints estructurados y está optimizada para integrarse con múltiples clientes frontend (web y móvil).

## 🚀 Características Principales

- ✅ **Arquitectura RESTful**: Endpoints estructurados y semánticos
- 🔐 **Autenticación Múltiple**: JWT, Google OAuth y sesiones seguras
- 📊 **Gestión de Planes**: CRUD completo de planes nutricionales personalizados
- 🏗️ **Arquitectura Modular**: Controladores, middleware y servicios separados
- 🛡️ **Seguridad Avanzada**: Middleware de autenticación, autorización y validación
- 📧 **Servicios de Email**: Recuperación de contraseña y verificación de códigos
- 📈 **Seguimiento de Progreso**: Gestión de peso y objetivos nutricionales
- 🌐 **CORS Configurado**: Soporte para múltiples dominios frontend
- ☁️ **Despliegue Automático**: CI/CD con GitHub Actions

## 🛠️ Tecnologías

### Backend
- **Node.js**: Entorno de ejecución JavaScript
- **Express.js**: Framework web minimalista y flexible
- **Sequelize**: ORM para JavaScript con soporte para MySQL

### Base de Datos
- **MySQL**: Sistema de gestión de bases de datos relacional

### Autenticación y Seguridad
- **JSON Web Tokens (JWT)**: Autenticación stateless
- **Passport.js**: Middleware de autenticación (Google OAuth)
- **Express Session**: Gestión de sesiones
- **bcrypt**: Hashing de contraseñas

### Servicios Externos
- **Cloudinary**: Gestión y almacenamiento de imágenes
- **Resend**: Servicio de envío de emails
- **Google OAuth 2.0**: Autenticación social

### DevOps
- **GitHub Actions**: CI/CD pipeline
- **Railway**: Plataforma de despliegue en la nube

## 📁 Estructura del Proyecto

```
PLANIME-RESTFUL-API/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD Pipeline
│
├── config/
│   ├── cloudinary.js              # Configuración de Cloudinary
│   ├── database.js                # Conexión a MySQL
│   ├── passport.js                # Estrategias de autenticación
│   └── session.js                 # Configuración de sesiones
│
├── controllers/
│   ├── auth/                      # Controladores de autenticación
│   ├── data/                      # Controladores de datos
│   └── PlansControllers.js        # Gestión de planes
│
├── middlewares/
│   ├── apiKeyMiddleware.js         # Validación de API keys
│   ├── authMiddleware.js           # Middleware de autenticación
│   └── jwtMiddleware.js            # Validación de tokens JWT
│
├── models/
│   ├── index.js                   # Configuración de modelos
│   ├── Plan.js                    # Modelo de planes
│   ├── progressWeight.js          # Progreso de peso
│   ├── user.js                    # Modelo de usuarios
│   └── weightGoal.js              # Objetivos de peso
│
├── routes/
│   ├── authRoutes.js              # Rutas de autenticación
│   ├── googleAuth.js              # Autenticación con Google
│   └── protectedRoutes.js         # Rutas protegidas
│
├── services/
│   └── resend.js                  # Servicio de emails
│
├── .env                           # Variables de entorno
├── package.json                   # Dependencias del proyecto
└── server.js                      # Punto de entrada de la aplicación
```

## 🎯 Nuestra Misión

Empoderar a las personas para que alcancen sus objetivos de salud y bienestar a través de planes de nutrición personalizados que sean accesibles, efectivos y disfrutables.

## 🔮 Nuestra Visión

Revolucionar la forma en que las personas abordan la nutrición combinando tecnología de vanguardia con ciencia nutricional.

## 💎 Nuestros Valores

### Personalización
Creemos que no hay dos personas iguales, y sus planes de nutrición tampoco deberían serlo.

### Adaptabilidad
Aprendemos y nos ajustamos continuamente para ofrecerte las soluciones más efectivas.

### Simplicidad
Hacemos que la nutrición sea sencilla y accesible, eliminando la complejidad.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- MySQL 8.0+
- npm o yarn

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/planime-restful-api.git
   cd planime-restful-api
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Database
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   DB_NAME=planime_db
   
   # JWT
   JWT_SECRET=tu_jwt_secret_muy_seguro
   
   # Google OAuth
   GOOGLE_CLIENT_ID=tu_google_client_id
   GOOGLE_CLIENT_SECRET=tu_google_client_secret
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   
   # Resend Email
   RESEND_API_KEY=tu_resend_api_key
   ```

4. **Configura la base de datos**
   ```bash
   # Crear la base de datos
   mysql -u root -p -e "CREATE DATABASE planime_db;"
   
   # Ejecutar migraciones (si las tienes)
   npm run migrate
   ```

5. **Inicia el servidor**
   ```bash
   # Desarrollo
   node server.js
   
   # Producción
   node server.js
   ```

## 🔌 Endpoints Principales

### Autenticación
```http
POST /api/register           # Registro de usuarios
POST /api/login              # Inicio de sesión
POST /api/emailForRecovery   # Recuperación de contraseña
POST /api/codeVerification   # Verificación de código
```

### Google OAuth
```http
GET  /auth/google            # Iniciar autenticación con Google
GET  /auth/google/callback   # Callback de Google OAuth
GET  /auth/google-token      # Obtener JWT tras OAuth
POST /auth/logout            # Cerrar sesión
```

### Rutas Protegidas (requieren JWT)
```http
GET  /api/protected/session     # Validar sesión
GET  /api/protected/profile     # Obtener perfil de usuario
POST /api/protected/generatePlan # Crear plan nutricional
GET  /api/protected/getPlansByID # Obtener planes del usuario
DELETE /api/protected/deletePlanByID/:planId # Eliminar plan

# Gestión de peso
POST /api/protected/setWeightRecord    # Registrar peso
POST /api/protected/setWeightGoal      # Establecer objetivo
GET  /api/protected/getAllWeightR      # Obtener registros de peso
PUT  /api/protected/changePassword     # Cambiar contraseña
```

## 🔒 Seguridad

### Middleware de Seguridad
- **JWT Authentication**: Validación de tokens en rutas protegidas
- **API Key Validation**: Control de acceso mediante API keys
- **CORS Configuration**: Configuración específica para dominios permitidos
- **Session Management**: Gestión segura de sesiones para OAuth

### Autenticación Múltiple
- **Credenciales tradicionales**: Email/contraseña con JWT
- **Google OAuth 2.0**: Autenticación social integrada
- **Recuperación de contraseña**: Sistema de códigos de verificación por email

## 🌐 Integración Frontend

La API está configurada para trabajar con:
- **PlaniMe WebApp**: `https://planime.diecode.lat`
- **PlaniMe Mobile App**: [Descargar APK](https://planime.diecode.lat/assets/downloads/PlaniMe_v1.0.apk)
- **Desarrollo local**: `http://localhost:5500`

## 📊 Base de Datos

### Modelos Principales
- **User**: Información de usuarios y autenticación
- **Plan**: Planes nutricionales personalizados
- **ProgressWeight**: Registros de seguimiento de peso
- **WeightGoal**: Objetivos de peso de los usuarios

### Relaciones
```sql
User (1:N) Plan          # Un usuario puede tener múltiples planes
User (1:N) ProgressWeight # Un usuario puede tener múltiples registros
User (1:1) WeightGoal    # Un usuario tiene un objetivo de peso
```

## 🚢 Despliegue

### Railway (Producción)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: railway deploy
```

### Variables de Entorno en Producción
- Configurar todas las variables del `.env` en Railway
- Asegurar conexión SSL con MySQL
- Configurar dominio personalizado

## 📧 Servicios de Email

### Resend Integration
```javascript
// Recuperación de contraseña
POST /api/emailForRecovery
{
  "email": "usuario@ejemplo.com"
}

// Verificación de código
POST /api/codeVerification
{
  "email": "usuario@ejemplo.com",
  "code": "123456"
}
```

## ⚡ Rendimiento

### Optimizaciones Implementadas
- **Connection Pooling**: Pool de conexiones MySQL optimizado
- **Middleware Caching**: Cache de respuestas frecuentes
- **Async/Await**: Operaciones asíncronas optimizadas
- **Error Handling**: Manejo robusto de errores



## 👨‍💻 Desarrollador

**Ing. Diego Magaña Álvarez**
- **Rol**: Arquitecto y Desarrollador Full-Stack
- **Experiencia**: 3+ años en el ciclo completo de desarrollo de aplicaciones web/móviles y sistemas escalables
- **Enfoque en el proyecto**: 
  - Arquitectura de APIs RESTful escalables
  - Sistemas de autenticación y autorización
  - Integración de bases de datos relacionales
  - Despliegue y DevOps en la nube
  - Optimización de rendimiento backend
  - Integración de servicios externos (OAuth, Email, Storage)
- **Contacto**: [soydiegoo71@gmail.com](mailto:soydiegoo71@gmail.com)

## 🌐 Aplicaciones Frontend

- **PlaniMe WebApp**: [https://planime.diecode.lat](https://planime.diecode.lat)
- **PlaniMe Mobile App**: [Descargar APK](https://planime.diecode.lat/assets/downloads/PlaniMe_v1.0.apk)

## 🆘 Soporte

¿Necesitas ayuda? Puedes:
- Crear un [issue](https://github.com/tu-usuario/planime-restful-api/issues) en GitHub
- Contactar al desarrollador: [soydiegoo71@gmail.com](mailto:soydiegoo71@gmail.com)
- Visitar nuestra página de [contacto](https://planime.diecode.lat/pages/contact/contactUs.html)

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!

**PlaniMe** - Revolucionando la nutrición personalizada con tecnología backend robusta 🚀
