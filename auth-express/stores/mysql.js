const { Sequelize } = require('sequelize');

const sequelizeMySQL = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = sequelizeMySQL;
