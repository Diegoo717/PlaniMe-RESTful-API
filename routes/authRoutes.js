const express = require('express');
const { createUser } = require('../controllers/auth/registerController');
const { searchUser } = require('../controllers/auth/loginController');
const { emailForRecobery } = require('../controllers/auth/emailForRecobery')

const router = express.Router();

router.post('/register', createUser)
router.post('/login', searchUser)
router.post('/emailForRecobery', emailForRecobery)


module.exports = router;
