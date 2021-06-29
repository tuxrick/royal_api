const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,    
      autoIncrement: true
    },
    name: {
    	type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
    	type: Sequelize.STRING
    },
    id_role: {
    	type: Sequelize.INTEGER
    }    
  },
  {
    timestamps: false,
    tableName: 'users'
  }
)