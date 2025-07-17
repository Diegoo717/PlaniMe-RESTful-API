const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'https://planime.diecode.lat/pages/auth/login.html?error=google_auth_failed',
        session: true
    }),
    (req, res) => {
        console.log('Google callback successful, user:', req.user ? req.user.id : 'no user');
        res.redirect('https://planime.diecode.lat/pages/home/dashboard.html?from_google=true&auth_success=true');
    }
);

router.get('/google-token', (req, res) => {
    console.log('Requesting JWT token, user in session:', req.user ? req.user.id : 'no user');
    console.log('Complete session:', req.session);
    
    if (!req.user) {
        console.log('No user in session');
        return res.status(401).json({ 
            error: "Not authenticated",
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
        
        console.log('JWT token successfully generated for user:', req.user.id);
        res.json({ 
            token,
            user: {
                id: req.user.id,
                email: req.user.email,
                firstName: req.user.firstName
            }
        });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error during logout' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Error destroying session' });
            }
            res.json({ message: 'Logout successful' });
        });
    });
});

module.exports = router;