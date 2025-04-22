const express = require('express');
const { createUser } = require('../controllers/registerController');
const { searchUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/register', createUser)
router.post('/login', searchUser)

module.exports = router;
