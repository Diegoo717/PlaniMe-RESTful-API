const session = require('express-session');

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-secret-session',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        secure: false, 
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 
    }
};

module.exports = session(sessionConfig);