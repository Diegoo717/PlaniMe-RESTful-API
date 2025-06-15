require('dotenv').config();
console.log('=== VERIFICACIÓN ENV ===');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : '❌ NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : '❌ NOT SET');
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL || '❌ NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : '❌ NOT SET');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'SET' : '❌ NOT SET');
console.log('========================');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const db = require('./models');
const User = db.User;

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-session',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        secure: false, 
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 día
    }
}));

app.use((req, res, next) => {
    if (req.path.includes('google') || req.path.includes('auth') || req.path.includes('debug')) {
        console.log(`\n🔍 [${new Date().toISOString()}] ${req.method} ${req.path}`);
        console.log('   Session ID:', req.sessionID);
        console.log('   Has User:', !!req.user);
        console.log('   User ID:', req.user ? req.user.id : 'NONE');
        console.log('   Cookies:', req.headers.cookie ? 'Present' : 'None');
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google Strategy - Profile recibido:', profile.id);
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
            user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (user) {
                user.googleId = profile.id;
                user.provider = 'google';
                await user.save();
                console.log('Usuario existente actualizado con Google ID');
            } else {
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName || profile.displayName.split(' ')[0],
                    lastName: profile.name.familyName || profile.displayName.split(' ')[1] || '',
                    provider: 'google',
                    password: null
                });
                console.log('Nuevo usuario creado desde Google');
            }
        }
        console.log('Usuario autenticado:', user.id);
        return done(null, user);
    } catch (error) {
        console.error('Error en Google Strategy:', error);
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializando usuario:', user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        console.log('Deserializando usuario:', user ? user.id : 'no encontrado');
        done(null, user);
    } catch (error) {
        console.error('Error deserializando usuario:', error);
        done(error, null);
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5500/HTML/login.html?error=google_auth_failed',
        session: true
    }),
    (req, res) => {
        console.log('Google callback exitoso, usuario:', req.user ? req.user.id : 'no user');
        res.redirect('http://localhost:5500/HTML/dashboard.html?from_google=true&auth_success=true');
    }
);

app.get('/api/auth/google-token', (req, res) => {
    console.log('Solicitando token JWT, usuario en sesión:', req.user ? req.user.id : 'no user');
    console.log('Sesión completa:', req.session);
    
    if (!req.user) {
        console.log('No hay usuario en la sesión');
        return res.status(401).json({ 
            error: "No autenticado",
            debug: {
                hasSession: !!req.session,
                sessionId: req.sessionID,
                hasUser: !!req.user
            }
        });
    }

    try {
        const token = jwt.sign(
            { 
                userId: req.user.id, 
                email: req.user.email,
                firstName: req.user.firstName 
            },
            process.env.JWT_SECRET,
            { expiresIn: '30min' } 
        );
        
        console.log('Token JWT generado exitosamente para usuario:', req.user.id);
        res.json({ 
            token,
            user: {
                id: req.user.id,
                email: req.user.email,
                firstName: req.user.firstName
            }
        });
    } catch (error) {
        console.error("Error generando token:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error durante logout' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Error destruyendo sesión' });
            }
            res.json({ message: 'Logout exitoso' });
        });
    });
});

app.use('/plans', express.static(path.join(__dirname, 'plans')));
app.use('/api', authRoutes);
app.use('/api/protected', jwtMiddleware, protectedRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.get('/debug/session', (req, res) => {
    res.json({
        hasUser: !!req.user,
        user: req.user ? { id: req.user.id, email: req.user.email } : null,
        sessionId: req.sessionID,
        session: req.session
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
});