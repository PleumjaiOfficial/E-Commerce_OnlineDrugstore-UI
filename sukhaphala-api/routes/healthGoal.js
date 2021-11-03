const router = require('express').Router();
const healthGoalInterface = require('../modules/healthGoal');

//get all health goals
router.get('/', async (req, res) => {
  try {
    const healthGoals = await healthGoalInterface.getAllHealthGoals();
    res.status(200).json(healthGoals);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;