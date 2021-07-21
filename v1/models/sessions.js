const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'sessions',
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
    time: {
    	type: Sequelize.TIME,
        allowNull: false
    },
    date: {
    	type: Sequelize.DATE,
        default: new Date(),
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'sessions'
  }
)