const { DataTypes } = require('sequelize');
const sequelize = require('../stores/mysql');

const User = sequelize.define(
  'User',
  {
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member',
    },
  },
  {
    timestamps: false,
    tableName: 'user',
  }
);

module.exports = User;
