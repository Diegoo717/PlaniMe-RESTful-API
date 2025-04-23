const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtMiddleware');
const { getProfile } = require('../controllers/data/profileController');
const { createPlan } = require('../controllers/Plans/createPlanController');
const { getUserPlans }  = require('../controllers/Plans/getPlanByID');

router.get('/session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session valid', user: req.user });
});

router.get('/profile', getProfile)
router.post('/generatePlan', createPlan);
router.get('/getPlansByID', getUserPlans);

module.exports = router;
