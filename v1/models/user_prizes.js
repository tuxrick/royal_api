const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'user_prizes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,    
      autoIncrement: true
    },
    id_gamer: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },    
    id_prize: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
    	type: Sequelize.DATE,
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'user_prizes'
  }
)