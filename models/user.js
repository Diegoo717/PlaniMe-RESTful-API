const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    firstName: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {  
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {  
        type: DataTypes.STRING,
        allowNull: true 
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    provider: {
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'local'
    }
});

module.exports = User;