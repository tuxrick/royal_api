const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'user_skins',
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
    id_skin: {
    	type: Sequelize.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'user_skins'
  }
)