const express = require('express');
const path = require('path');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend-app/HTML/index.html'));
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
