const sequelize = require('../config/database');

const User = require('./user');
const Plan = require('./Plan');
const ProgressWeight = require('./progressWeight');
const WeightGoal = require('./weightGoal');

User.associate = function(models) {
  User.hasMany(models.Plan, {
    foreignKey: 'userId',
    as: 'plans'
  });
};

Plan.associate({ User }); 

const db = {
  sequelize,
  User,
  Plan,
  ProgressWeight,
  WeightGoal
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("✅ Database synchronized successfully.");
  } catch (error) {
    console.error("❌ Error synchronizing the database:", error);
    process.exit(1);
  }
};

syncDatabase();

module.exports = db;