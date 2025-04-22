const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtMiddleware');

router.get('/session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session valid', user: req.user });
});

// Other protected routes

module.exports = router;
