const Sequelize = require('sequelize')
const db = {}
/*
const sequelize = new Sequelize('pinguspa_jobid', 'pinguspa_jobid', 'Tr3bolb!t!!', {
  host: 'localhost',
  port: '',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.Sequelize = Sequelize
*/

const sequelize = new Sequelize('royal_game', 'root', 'root', {
  host: 'localhost',
  port: '8889',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;


module.exports = db;