<div align="center">

# 🍎 PlaniMe RESTful API 🌐

**Robust backend for personalized nutrition: secure, scalable, and feature-rich**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

🔗 **[Production API](https://planime-rest-api.diecode.lat/)**

</div>

---

## 🎯 About The Project

**PlaniMe RESTful API** is the robust backend powering PlaniMe's personalized nutrition platform. Built with Node.js, Express, and Sequelize over MySQL, it implements modular controllers, data validation, JWT authentication middleware, and exposes structured endpoints optimized for integration with multiple frontend clients (web and mobile).

### What Makes Our API Special?

- 🏗️ **Modular Architecture**: Clean separation of controllers, middleware, and services
- 🔐 **Multi-Layer Security**: JWT, Google OAuth, and secure session management
- 📊 **Comprehensive Nutrition Management**: Complete CRUD for personalized meal plans
- ⚡ **High Performance**: Optimized database queries and connection pooling
- 🌐 **CORS Configured**: Support for multiple frontend domains
- 🚀 **Automated Deployment**: CI/CD with GitHub Actions

---

## ✨ Key Features

### 🔐 Advanced Authentication

- **JWT Authentication**: Stateless token-based authentication
- **Google OAuth 2.0**: Social authentication integration
- **Secure Sessions**: Robust session management
- **Password Recovery**: Email-based code verification system

### 🍽️ Nutrition Plan Management

- Personalized meal plan generation
- Complete CRUD operations for plans
- Nutritional goal tracking
- Progress monitoring and analytics

### 📊 Progress Tracking

- Weight record management
- Goal setting and achievement tracking
- Historical progress data
- Visual statistics preparation

### 🛡️ Security & Validation

- API key validation middleware
- Input sanitization and validation
- CORS configuration for secure cross-origin requests
- Rate limiting and security headers

---

## 🛠️ Tech Stack

### Backend Core

- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Minimalist web framework
- **[Sequelize](https://sequelize.org/)** - Promise-based Node.js ORM

### Database

- **[MySQL](https://mysql.com/)** - Relational database management system

### Authentication & Security

- **[JWT](https://jwt.io/)** - JSON Web Tokens for stateless authentication
- **[Passport.js](http://www.passportjs.org/)** - Authentication middleware
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[Express Session](https://github.com/expressjs/session)** - Session management

### External Services

- **[Cloudinary](https://cloudinary.com/)** - Image management and storage
- **[Resend](https://resend.com/)** - Email delivery service
- **[Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)** - Social authentication

### DevOps & Deployment

- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline automation
- **[Railway](https://railway.app/)** - Cloud deployment platform

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MySQL 8.0+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Diegoo717/PlaniMe-RESTful-API.git
   cd planime-restful-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configurations:

   ```env
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=planime_db

   # JWT Configuration
   JWT_SECRET=your_secure_jwt_secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Resend Email Service
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Set up the database**

   ```bash
   # Create database
   mysql -u root -p -e "CREATE DATABASE planime_db;"

   # Run migrations (if available)
   npm run migrate
   ```

5. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/register           # User registration
POST /api/login              # User login
POST /api/emailForRecovery   # Password recovery request
POST /api/codeVerification   # Code verification for recovery
```

### Google OAuth

```http
GET  /auth/google            # Initiate Google authentication
GET  /auth/google/callback   # Google OAuth callback
GET  /auth/google-token      # Get JWT after OAuth
POST /auth/logout            # Logout user
```

### Protected Routes (JWT Required)

```http
GET  /api/protected/session     # Validate user session
GET  /api/protected/profile     # Get user profile
POST /api/protected/generatePlan # Create nutritional plan
GET  /api/protected/getPlansByID # Get user's plans
DELETE /api/protected/deletePlanByID/:planId # Delete specific plan

# Weight Management
POST /api/protected/setWeightRecord    # Record weight entry
POST /api/protected/setWeightGoal      # Set weight goal
GET  /api/protected/getAllWeightR      # Get all weight records
PUT  /api/protected/changePassword     # Change user password
```

---

## 🔒 Security Features

### Authentication Layers

- **JWT Validation**: Secure token-based authentication for API endpoints
- **Google OAuth Integration**: Social authentication with secure callback handling
- **Session Management**: Secure session storage for OAuth flows
- **Password Hashing**: bcrypt for secure password storage

### Security Middleware

- **API Key Validation**: Controlled access through API keys
- **CORS Configuration**: Domain-specific cross-origin requests
- **Input Validation**: Data sanitization and validation
- **Rate Limiting**: Protection against brute force attacks

### Data Protection

- **Environment Variables**: Secure configuration management
- **Database Security**: Parameterized queries and connection pooling
- **HTTPS Enforcement**: SSL/TLS in production environments

---

## 🌐 Frontend Integration

The API is configured to work seamlessly with:

- **PlaniMe WebApp**: `https://planime.diecode.lat`
- **PlaniMe Mobile App**: [Download APK](https://planime.diecode.lat/assets/downloads/PlaniMe_v1.0.apk)
- **Local Development**: `http://localhost:5500`

### CORS Configuration

```javascript
// Configured for multiple frontend origins
app.use(
  cors({
    origin: ["https://planime.diecode.lat", "http://localhost:5500"],
    credentials: true,
  })
);
```

---

## 📊 Database Architecture

### Core Models

- **User**: User authentication and profile information
- **Plan**: Personalized nutrition plans with meal details
- **ProgressWeight**: Historical weight tracking records
- **WeightGoal**: User-defined weight objectives

### Database Relationships

```sql
User (1:N) Plan          -- One user can have multiple plans
User (1:N) ProgressWeight -- One user can have multiple weight records
User (1:1) WeightGoal    -- One user has one weight goal
```

### Key Features

- **Connection Pooling**: Optimized MySQL connections
- **Data Validation**: Model-level validation constraints
- **Associations**: Proper relational mappings
- **Migrations**: Database schema version control

---

## 🚢 Deployment

### Environment Setup

- Configure all environment variables
- Ensure SSL connection with MySQL database
- Set up custom domain configuration
- Configure monitoring and logging

---

## 📧 Email Services

### Resend Integration

The API integrates with Resend for email services including:

- **Password Recovery**: Send verification codes for account recovery
- **User Notifications**: Plan updates and progress alerts
- **Account Verification**: Email confirmation for new users

```javascript
// Password recovery flow
POST /api/emailForRecovery
{
  "email": "user@example.com"
}

// Code verification
POST /api/codeVerification
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

## ⚡ Performance Optimizations

### Database Optimization

- **Connection Pooling**: Efficient MySQL connection management
- **Query Optimization**: Optimized Sequelize queries with proper indexing
- **Lazy Loading**: Efficient data loading patterns

### Application Performance

- **Middleware Caching**: Response caching for frequent requests
- **Async/Await**: Non-blocking asynchronous operations
- **Error Handling**: Robust error handling without performance impact
- **Compression**: Response compression for faster transfers

### Monitoring & Logging

- **Request Logging**: Detailed request/response logging
- **Error Tracking**: Comprehensive error tracking and reporting
- **Performance Metrics**: Response time monitoring

---

## 🌐 Connected Applications

- **PlaniMe WebApp**: [https://planime.diecode.lat](https://planime.diecode.lat)
- **PlaniMe Mobile App**: [Download APK](https://planime.diecode.lat/assets/downloads/PlaniMe_v1.0.apk)
- **API Documentation**: [https://planime-rest-api.diecode.lat/](https://planime-rest-api.diecode.lat/)

---

## 📄 License

© 2025 PlaniMe. All rights reserved.

This project is a personal portfolio project and is not licensed for public use, modification, or distribution.

---

## 📞 Contact

**Diego Magaña Álvarez**  
_Full-Stack Developer_

soydiegoo71@gmail.com | +52 445 105 9192

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diego-magana-dev)

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize ORM Documentation](https://sequelize.org/)
- [JWT.io Documentation](https://jwt.io/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Resend Documentation](https://resend.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

<div align="center">

⭐ If you like this project, don't forget to give it a star!

**PlaniMe** - Revolutionizing personalized nutrition with robust backend technology 🚀

**Made with ❤️ and ☕**

</div>
