const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'scores',
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
    score: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },    
    level: {
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
    tableName: 'scores'
  }
)