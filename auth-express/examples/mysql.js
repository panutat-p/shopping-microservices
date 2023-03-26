const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const argon2 = require('argon2');

dotenv.config({ path: '../.env' });

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

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

(async () => {
  const hash = await argon2.hash('112233');
  await User.create({
    full_name: 'monkey',
    email: 'monkey1@gmail.com',
    password: hash,
  });
})();
