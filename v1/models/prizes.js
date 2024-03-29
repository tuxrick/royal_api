const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'prizes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,    
      autoIncrement: true
    },
    reasonId: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },    
    reasonDescription: {
    	type: Sequelize.STRING,
        allowNull: false
    },
    active: {
    	type: Sequelize.BOOLEAN,
        allowNull: false
    },    
    description: {
    	type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'prizes'
  }
)