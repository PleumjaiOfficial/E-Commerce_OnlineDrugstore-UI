const mongoose = require('mongoose');

const HealthGoalSchema = new mongoose.Schema({
  name: String
});

const HealthGoal = mongoose.model('HealthGoal');

module.exports = HealthGoal;
