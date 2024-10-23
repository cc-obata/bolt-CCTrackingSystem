const { Sequelize } = require('sequelize');
const config = require('config');

const dbConfig = config.get('database');

const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mssql',
  dialectOptions: {
    options: dbConfig.options
  },
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;