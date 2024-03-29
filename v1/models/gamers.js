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
    latestDate: {
    	type: Sequelize.DATE,
      defaultValue: new Date()
    },    
    saved_progress: {
    	type: Sequelize.JSON,
      defaultValue: {
        "foto":14,
        "tutorialMapamundi":0,
        "tutorialMapaHawaii":0,
        "tutorialMatch3":0,
        "tutorial1010":0,
        "tutorialRunner":0,
        "tutorialMapaHawaii":0,
        "PiruetasMostrado":0,
        "TornadoMostrado":0,
        "RampaMostrada":0,
        "ActualizaInfo":	0,
        "JuegoPremio":0,
        "DatosActualizados":"",
        "Hawaii1":0,
        "Hawaii2":0,
        "Hawaii3":0,
        "Hawaii4":0,
        "Hawaii5":0,
        "Hawaii6":0,
        "Hawaii7":0,
        "Hawaii8":0,
        "WestUSA1":0,
        "WestUSA2":0,
        "WestUSA3":0,
        "WestUSA4":0,
        "WestUSA5":0,
        "WestUSA6":0,
        "WestUSA7":0,
        "WestUSA8":0,
        "WestUSA9":0,
        "WestUSA10":0,
        "WestUSA11":0,
        "WestUSA12":0,
        "WestUSA13":0,
        "WestUSA14":0,
        "WestUSA15":0,
        "WestUSA16":0,
        "WestUSA17":0,
        "WestUSA18":0,
        "WestUSA19":0,
        "WestUSA20":0,
        "WestUSA21":0,
        "WestUSA22":0,
        "WestUSA23":0,
        "WestUSA24":0,
        "WestUSA25":0,
        "WestUSA26":0,
        "WestUSA27":0,
        "WestUSA28":0,
        "WestUSA29":0,
        "WestUSA30":0,
        "WestUSA31":0,
        "WestUSA32":0,
        "WestUSA33":0,
        "WestUSA34":0,
        "WestUSA35":0,
        "WestUSA36":0,
        "WestUSA37":0,
        "WestUSA38":0,
        "WestUSA39":0,
        "WestUSA40":0,
        "EastUSA1":0,
        "EastUSA2":0,
        "EastUSA3":0,
        "EastUSA4":0,
        "EastUSA5":0,
        "EastUSA6":0,
        "EastUSA7":0,
        "EastUSA8":0,
        "EastUSA9":0,
        "EastUSA10":0,
        "EastUSA11":0,
        "EastUSA12":0,
        "EastUSA13":0,
        "EastUSA14":0,
        "EastUSA15":0,
        "EastUSA16":0,
        "Mexico1":0,
        "Mexico2":0,
        "Mexico3":0,
        "Mexico4":0,
        "Mexico5":0,
        "Mexico6":0,
        "Mexico7":0,
        "Mexico8":0,
        "Mexico9":0,
        "Mexico10":0,
        "Mexico11":0,
        "Mexico12":0,
        "Mexico13":0,
        "Mexico14":0,
        "Mexico15":0,
        "Mexico16":0,
        "Mexico17":0,
        "Mexico18":0,
        "Mexico19":0,
        "Mexico20":0,
        "Mexico21":0,
        "Mexico22":0,
        "Mexico23":0,
        "Mexico24":0,
        "Mexico25":0,
        "Mexico26":0,
        "Mexico27":0,
        "Mexico28":0,
        "Mexico29":0,
        "Mexico30":0,
        "Mexico31":0,
        "Mexico32":0,
        "Mexico33":0,
        "Mexico34":0,
        "Mexico35":0,
        "Mexico36":0,
        "Mexico37":0,
        "Mexico38":0,
        "Mexico39":0,
        "Mexico40":0,
        "Mexico41":0,
        "Mexico42":0,
        "Mexico43":0,
        "Mexico44":0,
        "Mexico45":0,
        "Mexico46":0,
        "Mexico47":0,
        "Mexico48":0,
        "Mexico49":0,
        "Mexico50":0,
        "Mexico51":0,
        "Mexico52":0,
        "Mexico53":0,
        "Mexico54":0,
        "Mexico55":0,
        "Mexico56":0,
        "Mexico57":0,
        "Mexico58":0,
        "Mexico59":0,
        "Mexico60":0,
        "Mexico61":0,
        "Mexico62":0,
        "Mexico63":0,
        "Mexico64":0,
        "Mexico65":0,
        "Mexico66":0,
        "Mexico67":0,
        "Mexico68":0,
        "Mexico69":0,
        "Mexico70":0,
        "Mexico71":0,
        "Mexico72":0,
        "Caribe1":0,
        "Caribe2":0,
        "Caribe3":0,
        "Caribe4":0,
        "Caribe5":0,
        "Caribe6":0,
        "Caribe7":0,
        "Caribe8":0,
        "Caribe9":0,
        "Caribe10":0,
        "Caribe11":0,
        "Caribe12":0,
        "Caribe13":0,
        "Caribe14":0,
        "Caribe15":0,
        "Caribe16":0,
        "Caribe17":0,
        "Caribe18":0,
        "Caribe19":0,
        "Caribe20":0,
        "Caribe21":0,
        "Caribe22":0,
        "Caribe23":0,
        "Caribe24":0,
        "Sudamerica1":0,
        "Sudamerica2":0,
        "Sudamerica3":0,
        "Sudamerica4":0,
        "Sudamerica5":0,
        "Sudamerica6":0,
        "Sudamerica7":0,
        "Sudamerica8":0,
        "Sudamerica9":0,
        "Sudamerica10":0,
        "Sudamerica11":0,
        "Sudamerica12":0,
        "Sudamerica13":0,
        "Sudamerica14":0,
        "Sudamerica15":0,
        "Sudamerica16":0,
        "Sudamerica17":0,
        "Sudamerica18":0,
        "Sudamerica19":0,
        "Sudamerica20":0,
        "Sudamerica21":0,
        "Sudamerica22":0,
        "Sudamerica23":0,
        "Sudamerica24":0,
        "Sudamerica25":0,
        "Sudamerica26":0,
        "Sudamerica27":0,
        "Sudamerica28":0,
        "Sudamerica29":0,
        "Sudamerica30":0,
        "Sudamerica31":0,
        "Sudamerica32":0,
        "Europa1":0,
        "Europa2":0,
        "Europa3":0,
        "Europa4":0,
        "Europa5":0,
        "Europa6":0,
        "Europa7":0,
        "Europa8":0,
        "Europa9":0,
        "Europa10":0,
        "Europa11":0,
        "Europa12":0,
        "Europa13":0,
        "Europa14":0,
        "Europa15":0,
        "Europa16":0,
        "Europa17":0,
        "Europa18":0,
        "Europa19":0,
        "Europa20":0,
        "Europa21":0,
        "Europa22":0,
        "Europa23":0,
        "Europa24":0,
        "Europa25":0,
        "Europa26":0,
        "Europa27":0,
        "Europa28":0,
        "Europa29":0,
        "Europa30":0,
        "Europa31":0,
        "Europa32":0,
        "Europa33":0,
        "Europa34":0,
        "Europa35":0,
        "Europa36":0,
        "Europa37":0,
        "Europa38":0,
        "Europa39":0,
        "Europa40":0,
        "Europa41":0,
        "Europa42":0,
        "Europa43":0,
        "Europa44":0,
        "Europa45":0,
        "Europa46":0,
        "Europa47":0,
        "Europa48":0,
        "Europa49":0,
        "Europa50":0,
        "Europa51":0,
        "Europa52":0,
        "Europa53":0,
        "Europa54":0,
        "Europa55":0,
        "Europa56":0,
        "Europa57":0,
        "Europa58":0,
        "Europa59":0,
        "Europa60":0,
        "Europa61":0,
        "Europa62":0,
        "Europa63":0,
        "Europa64":0,
        "Estrellas":0,
        "Ha":"00000000",
        "We":"0000000000000000000000000000000000000000",
        "Ea":"0000000000000000",
        "Me":"000000000000000000000000000000000000000000000000000000000000000000000000",
        "Ca":"000000000000000000000000",
        "Su":"00000000000000000000000000000000",
        "Eu":"0000000000000000000000000000000000000000000000000000000000000000",
        "Survey":0,
        "UltimoEspecial":0,
        "mes1":"",
        "mes2":"",
        "mes3":"",
        "mes4":"",
        "mes5":"",
        "PremioHawaii10":"",
        "PremioHawaii20":"",
        "PremioWestUSA30":"",
        "PremioWestUSA40":"",
        "PremioWestUSA50":"",
        "PremioWestUSA60":"",
        "PremioWestUSA70":"",
        "PremioWestUSA80":"",
        "PremioWestUSA90":"",
        "PremioWestUSA100":"",
        "PremioWestUSA110":"",
        "PremioWestUSA120":"",
        "PremioEastUSA130":"",
        "PremioEastUSA140":"",
        "PremioEastUSA150":"",
        "PremioEastUSA160":"",
        "PremioMexico170":"",
        "PremioMexico180":"",
        "PremioMexico190":"",
        "PremioMexico200":"",
        "PremioMexico210":"",
        "PremioMexico220":"",
        "PremioMexico230":"",
        "PremioMexico240":"",
        "PremioMexico250":"",
        "PremioMexico260":"",
        "PremioMexico270":"",
        "PremioMexico280":"",
        "PremioMexico290":"",
        "PremioMexico300":"",
        "PremioMexico310":"",
        "PremioMexico320":"",
        "PremioMexico330":"",
        "PremioMexico340":"",
        "PremioCaribe350":"",
        "PremioCaribe360":"",
        "PremioCaribe370":"",
        "PremioCaribe380":"",
        "PremioCaribe390":"",
        "PremioCaribe400":"",
        "PremioSudamerica410":"",
        "PremioSudamerica420":"",
        "PremioSudamerica430":"",
        "PremioSudamerica440":"",
        "PremioSudamerica450":"",
        "PremioSudamerica460":"",
        "PremioSudamerica470":"",
        "PremioSudamerica480":"",
        "PremioEuropa490":"",
        "PremioEuropa500":"",
        "PremioEuropa510":"",
        "PremioEuropa520":"",
        "PremioEuropa530":"",
        "PremioEuropa540":"",
        "PremioEuropa550":"",
        "PremioEuropa560":"",
        "PremioEuropa570":"",
        "PremioEuropa580":"",
        "PremioEuropa590":"",
        "PremioEuropa600":"",
        "PremioEuropa610":"",
        "PremioEuropa620":"",
        "PremioEuropa630":"",
        "PremioEuropa640":"",
        "ActualJourney":0,
        "latestDate":""
        }
    },          
    languaje: {
    	type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'ING'
    }      
  },
  {
    timestamps: false,
    tableName: 'gamers'
  }
)