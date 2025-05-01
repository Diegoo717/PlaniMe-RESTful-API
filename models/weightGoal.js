const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeightGoal = sequelize.define('WeightGoal', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true 
    },
    weightGoal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = WeightGoal;