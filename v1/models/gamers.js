const Sequelize = require('sequelize')
const db = require('../../database/db.js')

module.exports = db.sequelize.define(
  'gamers',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,    
      autoIncrement: true
    },
    id_owner: {
    	type: Sequelize.INTEGER
    },
    id_site: {
    	type: Sequelize.INTEGER,
      defaultValue: null
    },
    id_contract: {
    	type: Sequelize.INTEGER,
      defaultValue: null
    },
    id_ownertype: {
    	type: Sequelize.INTEGER,
      defaultValue: null
    },
    ownertype: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    ownerstatus: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    salutation: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    company: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    first_name: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    last_name: {
    	type: Sequelize.STRING,
      defaultValue: null
    },
    city: {
    	type: Sequelize.STRING,
      defaultValue: null
    },                                    
    country: {
    	type: Sequelize.STRING,
      defaultValue: null
    },    
    state: {
    	type: Sequelize.STRING,
      defaultValue: null
    },    
    email: {
    	type: Sequelize.STRING
    },  
    birthdate: {
    	type: Sequelize.STRING,
      defaultValue: null
    },      
    preferred_languaje: {
    	type: Sequelize.STRING,
      defaultValue: null
    },    
    phone: {
    	type: Sequelize.STRING,
      defaultValue: null
    }, 
    welcome_call_one: {
    	type: Sequelize.INTEGER,
      defaultValue: false
    },       
    welcome_call_two: {
    	type: Sequelize.INTEGER,
      defaultValue: false
    },    
    validated_email: {
    	type: Sequelize.BOOLEAN,
      defaultValue: false
    },    
    id_avatar: {
    	type: Sequelize.INTEGER,
      defaultValue: null
    },    
    code: {
    	type: Sequelize.INTEGER,
      defaultValue: 000000
    },    
    expiration_time: {
    	type: Sequelize.DATE,
      defaultValue: null
    },    
    answered_survey: {
    	type: Sequelize.BOOLEAN,
      defaultValue: false
    },        
  },
  {
    timestamps: false,
    tableName: 'gamers'
  }
)