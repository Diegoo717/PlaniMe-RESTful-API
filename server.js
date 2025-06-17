require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sessionConfig = require('./config/session');
const passport = require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const googleAuthRoutes = require('./routes/googleAuth');

const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const { authLoggingMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use(authLoggingMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/plans', express.static(path.join(__dirname, 'plans')));
app.use('/api', authRoutes);
app.use('/api/protected', jwtMiddleware, protectedRoutes);
app.use('/auth', googleAuthRoutes);
app.use('/api/auth', googleAuthRoutes);

app.get('/', (req, res) => {
    res.send('API ready :)');
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
    res.status(500).send('something went wrong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Local server run in http://localhost:${PORT}`);
    console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
});