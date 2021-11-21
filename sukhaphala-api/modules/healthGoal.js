const HealthGoal = require('../models/HealthGoal');

//get all categories (health goal) of products 
const getAllHealthGoals = async () => {
  try {
    const healthGoals = await HealthGoal.find();
    return healthGoals;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'cannot get all health goals'
    };
  }
};

module.exports = {
  getAllHealthGoals: getAllHealthGoals
}