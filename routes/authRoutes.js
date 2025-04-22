const express = require('express');
const { createUser } = require('../controllers/auth/registerController');
const { searchUser } = require('../controllers/auth/loginController');

const router = express.Router();

router.post('/register', createUser)
router.post('/login', searchUser)

module.exports = router;
