const HealthGoal = require('../models/HealthGoal');

const getAllHealthGoals = async () => {
  try {
    const healthGoals = await HealthGoal.find();
    return healthGoals;
  } catch (err) {
    return {
      type: 'FAIL',
      message: 'cannot get all health goals'
    };
  }
};

module.exports = {
  getAllHealthGoals: getAllHealthGoals
}