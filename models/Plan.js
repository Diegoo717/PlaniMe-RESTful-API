const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['m', 'f']]
    }
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  activityLevel: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['sedentario', 'ligero', 'moderado', 'activo']]
    }
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['perder', 'mantener', 'aumentar']]
    }
  },
  imc: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  planName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  planImagePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Plan.associate = function(models) {
  Plan.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

module.exports = Plan;