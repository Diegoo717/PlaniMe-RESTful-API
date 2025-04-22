const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtMiddleware');
const { getProfile } = require('../controllers/data/profileController');

router.get('/session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session valid', user: req.user });
});

router.get('/profile', getProfile)

module.exports = router;
