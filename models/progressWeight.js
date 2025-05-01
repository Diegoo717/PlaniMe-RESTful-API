const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProgressWeight = sequelize.define('ProgressWeight', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = ProgressWeight;