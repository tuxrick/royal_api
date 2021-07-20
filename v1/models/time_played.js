const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'time_played',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,    
      autoIncrement: true
    },
    id_game: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },    
    id_gamer: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },
    time_played: {
    	type: Sequelize.TIME,
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'time_played'
  }
)