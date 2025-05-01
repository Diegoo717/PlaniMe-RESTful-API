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
    console.log("Base de datos sincronizada.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

syncDatabase();

module.exports = db;