const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtMiddleware');
const { getProfile } = require('../controllers/data/profileController');
const { createPlan } = require('../controllers/PlansControllers/createPlanController');
const { getUserPlans }  = require('../controllers/PlansControllers/getPlanByID');
const { deleteUserPlan } = require('../controllers/PlansControllers/deletePlanByID');
const { setWeightRecord } = require('../controllers/data/progressUser/setWeightRecord');
const { setWeightGoal } = require('../controllers/data/progressUser/setWeightGoalController');
const { deleteWeightGoal } = require('../controllers/data/progressUser/deleteWeightGoal');
const { deleteWeightRecord } = require('../controllers/data/progressUser/deleteWeightRecord');
const { changeWeightRecord } = require('../controllers/data/progressUser/changeWeightRecord');

router.get('/session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session valid', user: req.user });
});

router.get('/profile', getProfile)
router.post('/generatePlan', createPlan);
router.get('/getPlansByID', getUserPlans);
router.delete('/deletePlanByID/:planId', deleteUserPlan);

router.post('/setWeightRecord', setWeightRecord);
router.post('/setWeightGoal', setWeightGoal);
router.put('/changeWeightR', changeWeightRecord);
router.delete('/deleteWeightG', deleteWeightGoal);
router.delete('/deleteWeightR', deleteWeightRecord);

module.exports = router;
