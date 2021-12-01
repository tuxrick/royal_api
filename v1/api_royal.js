const axios = require('axios');
const crypto = require('crypto');
const iso8601 = require('iso8601');

module.exports = {
  //Getting token from royal to make requests to their system
  login_royal: function() {

    const royal_data = {
      server: process.env.ROYAL_SERVER_AUTHENTICATION,
      UserName: process.env.ROYAL_SERVER_AUTHENTICATION_UserName,
      Password: process.env.ROYAL_SERVER_AUTHENTICATION_Password,
      client_id: process.env.ROYAL_SERVER_AUTHENTICATION_client_id
    }

    let axios_call =  axios.post(royal_data.server+'/login', {
      "UserName": royal_data.UserName,
      "Password": royal_data.Password,
      "client_id": royal_data.client_id
    })
    .then(async (response) => {
      //console.log(response);
      return response.data;
    }).catch((error) => {
      //console.log("error " + error);
      return error;
    });    

    return axios_call; 
  },
  
  //Welcome kit user info 
  WKGralInfo: async function(id_owner) {  


    let token = await this.login_royal();

    if(token.access_token){
      
      let axios_call = await axios.get(process.env.ROYAL_SERVER+'/WKGralInfo/rwgralownerinfo?ownerId=' + id_owner ,{
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        console.log(response);
        return response.data;
      }).catch((error) => {
        //console.log(error);
        return {
          error: true,
          detail: error,
          message: "error connecting WKGralInfo endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }

    /*
    let response = {
      data:{
        "ownerId": 12345,
        "contracts": [
            {
                "contractId": 101217,
                "siteId": 5,
                "ownerID": 12345,
                "contractNumber": "5-100726",
                "contractDate": "2002-08-28T00:00:00",
                "deededStatus": "Upgrade",
                "siteName": "D-SR MX  Insurgentes",
                "contractStatus": "Current Owner",
                "points": 15000.00,
                "pkgType": "SLVR",
                "currencyName": "Mexican Pesos",
                "codeCompaniaContable": 1613,
                "companiaContable": "Gpo CMX S",
                "incentives": []
            }
        ],
        "ownerDetail": {
            "ownerID": 12345,
            "prospectID": 12345,
            "siteID": 30,
            "ownerNumber": "12345",
            "ownerTypeID": 3,
            "ownerType": "Swiss Member",
            "ownerStatusID": 377,
            "ownerStatus": "Active",
            "salutation": "",
            "company": "",
            "lastName": "Cesin Farah",
            "firstName": "Javier",
            "streetAddress": "VIALIDAD OTRO ALGUNA CALLE NUM 150 150 ASENTAMIENTO OTRO COLONIA OTRO",
            "city": "Ciudad de México",
            "county": "DELEGACIÓN MUNICIPIO",
            "state": "CMX",
            "postalCode": "03500",
            "countryID": 52,
            "country": "Mexico",
            "phone1": null,
            "phone2": null,
            "fax": null,
            "email": null,
            "ssn": "12345",
            "exchangeNumber": "2684-20822",
            "passportNum": "",
            "driverLicense": "",
            "birthdate": "1978-09-09T00:00:00",
            "maritalStatusID": 265,
            "maritalStatus": "Married",
            "spouseName": "LOCM801216",
            "occupationID": 366,
            "occupation": "Unknown",
            "householdIncome": 0,
            "preferredLanguageID": 249,
            "preferredLanguage": "Spanish",
            "creditCardTypeID": null,
            "creditCardType": null,
            "creditCardNumber": null,
            "creditCardExpiration": null,
            "password": "",
            "referralCreditBal": 0.00,
            "steward": "",
            "dateLocked": null,
            "user1": "",
            "user2": "",
            "user3": "",
            "user4": "",
            "user5": "",
            "user6": "PIF Azul L",
            "user7": "royal123            ",
            "user8": "",
            "user9": "",
            "user10": "",
            "user11": 0,
            "user12": 0,
            "user13": null,
            "user14": 0.00,
            "user15": 1,
            "useACH": null,
            "accountName": null,
            "routingNumber": null,
            "accountNumber": null,
            "ownerSubTypeID": 8,
            "ownerSubType": "Silver",
            "ccLastFour": null,
            "driverLicenseST": "",
            "trustName": "",
            "alternateName": "",
            "gender": " ",
            "fico": "",
            "stateOfInc": "",
            "idType": "",
            "idNumber": "",
            "nationalityID": 479,
            "incomeID": 0,
            "currencyID": 0,
            "stateID": 26,
            "driverLicenseSTID": 0,
            "isToken": null,
            "emails": [
                {
                    "ownerEmailId": 5756,
                    "ownerId": 12345,
                    "emailOwner": "javiercesin@prodigy.net.mx",
                    "isDefault": true
                }
            ],
            "phones": [
                {
                    "ownerPhoneId": 24058,
                    "ownerId": 12345,
                    "phoneNumber": "5558134977",
                    "isDefault": true,
                    "countryId": 52
                },
                {
                    "ownerPhoneId": 24059,
                    "ownerId": 12345,
                    "phoneNumber": "5524555800",
                    "isDefault": false,
                    "countryId": 52
                },
                {
                    "ownerPhoneId": 24060,
                    "ownerId": 12345,
                    "phoneNumber": "5543606843",
                    "isDefault": false,
                    "countryId": 52
                }
            ]
        },
        "isWC1Answered": false,
        "isWC2Answered": false
      }    
    };
    return response.data;
    */
  },      

  //Añadir un teléfono al usuario 
  addphone2owner: async function(ownerId,PhoneNumber,phone_type){  

    let token = await this.login_royal();
    //console.log(process.env.ROYAL_SERVER);
    if(token.access_token){
      
      let axios_call = await axios.post(process.env.ROYAL_SERVER+'/OwnerContactInfo/addphone2owner',
      {
        "OwnerId":ownerId,
        "PhoneNumber":PhoneNumber,
        "PhoneTypeID":phone_type,
        "CountryId":52,
        "isDefault":false
      },
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        //console.log(response);
        return response.data;
      }).catch((error) => {
        //console.log(error);
        return {
          error: true,
          detail: error,
          message: "error connecting addphone2owner endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
  

    /*  
    let response = {
      data:{
        "codeResponse": 0,
        "messageResponse": "Teléfono registrado con éxito."
      }    
    };
    return response.data;
    */
  },

  //Añadir un email al usuario 
  addemail2owner: async function(ownerId,email){  

    let token = await this.login_royal();
    //console.log(process.env.ROYAL_SERVER);
    if(token.access_token){
      
      let axios_call = await axios.post(process.env.ROYAL_SERVER+'/OwnerContactInfo/addemail2owner',
      {
        "OwnerId":ownerId,
        "EmailOwner": email,
        "EmailTypeID":2,
        "isDefault":false        
      },
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        //console.log(response);
        return response.data;
      }).catch((error) => {
        //console.log(error);
        return {
          error: true,
          detail: error,
          message: "error connecting addemail2owner endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
    /*  
    let response = {
      data:{
        "codeResponse": 0,
        "messageResponse": "Teléfono registrado con éxito."
      }    
    };
    return response.data;
    */
  },

  //Registra las respuestas de las preguntas de la encuesta/survey
  savesurveyanswers: async function(AnswerValues){  
    /*
      PARAMETROS
      {
        “OwnerId”:12345,
        “SurveyId”:4
        “AnswerValues”: [
          { “SurveyQuestionID”:25,
          “AnswerValue”:”Respuesta”},
        ]
      }
    */
      let token = await this.login_royal();
      //console.log(process.env.ROYAL_SERVER);
      if(token.access_token){
        
        let axios_call = await axios.post(process.env.ROYAL_SERVER+'/survey/savesurveyanswers',
        AnswerValues,
        {
          headers: {
            'Authorization': `Bearer ${token.access_token}`
          }
        })
        .then(async (response) => {
          console.log(response);
          return response.data;
        }).catch((error) => {
          console.log(error);
          return {
            error: true,
            detail: error,
            message: "error connecting savesurveyanswers endpoint"
          }
        });    
      
        return axios_call; 
  
      }else{
        return {
          error: true,
          message: "error connecting to royal systems"
        }
      }
    /*  
    let response = {
      data:{
        Error:false,
        MessageError: "ERROR: El registro del survey….",
        ResponseDate:"“2021-02-03"
      }
    };
    return response.data;
    */
  },

  //Registra los premios del usuario
  registerprizes: async function(owner_id, contract_id, reason_id){ 
  
    /*
    //Parámetros
    {
      "OwnerId":12345,
      "ContractId":101217,
      "ReasonId":4
    }
    */
    let token = await this.login_royal();
    //console.log(process.env.ROYAL_SERVER);
    if(token.access_token){
      
      let axios_call = await axios.post(process.env.ROYAL_SERVER+'/WKGralInfo/registerprizes',
      {
        "OwnerId":owner_id,
        "ContractId":contract_id,
        "ReasonId":reason_id
      },
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        //console.log(response);
        return response.data;
      }).catch((error) => {
        //console.log("error " + error);
        return {
          error: true,
          detail: error,
          message: "error connecting registerprizes endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
      
  },

  //Envía el código de activación del juego para el usuario
  sendcodemail: async function(email, owner_id, name, last_name, code){
    /*
    {
      "email": "tuxrick@gmail.com",
      "data": 
        {
          "global":{
            "Nombre": "Mario LC (Prueba 09/07/2021)",
            "OwnerID": "666",
            "montostars":"9,999",
            "montorewards":"1000"
        }
      }
    }
    */

    
    
    const user = 'royalholiday005';
    const secret = 'AUi6vsXytkfuvLMsnbrZ';
    
    let wss_header = getWsseHeader(user,secret);

    let axios_call = await axios.post('https://api.emarsys.net/api/v2/email/3085447/broadcast',    
    {
      "email": email,
      "data": {
        "global":{
          "Nombre": name,
          "OwnerID": owner_id,
        "claveact": code
        }
      }
    },
    {
      headers: {
        //"x-wsse": "UsernameToken Username=\"royalholiday005\", PasswordDigest=\"OGFmMWUzNzYyZTFhN2U5OWE5N2IwM2EwYzZhYTMyOWY1NjIxNmUyOA==\", Nonce=\"4c060407cc822eaab9e54aa7b6001740\", Created=\"2021-08-04T20:42:59Z\"",
        "X-WSSE":wss_header + ' Content-type: application/json;charset="utf-8"',
        "content-type": "application/json"
      }
    })
    .then(async (response) => {
      //console.log(response);
      return response.data;
    }).catch((error) => {
      //console.log(error);
      return {
        error: true,
        detail: error,
        message: "error connecting emarsys endpoint"
      }
    });

    return axios_call;
  },

  //Envía el Correo al obtener un premio
  sendprizemail: async function(owner_id, name, prize_id){
    
    const user = 'royalholiday005';
    const secret = 'AUi6vsXytkfuvLMsnbrZ';
    
    let wss_header = getWsseHeader(user,secret);

    let axios_call = await axios.post('https://api.emarsys.net/api/v2/email/3085447/broadcast',    
    {
      "email": email,
      "data": {
        "global":{
          "Nombre": name,
          "OwnerID": owner_id,
        "claveact": code
        }
      }
    },
    {
      headers: {
        //"x-wsse": "UsernameToken Username=\"royalholiday005\", PasswordDigest=\"OGFmMWUzNzYyZTFhN2U5OWE5N2IwM2EwYzZhYTMyOWY1NjIxNmUyOA==\", Nonce=\"4c060407cc822eaab9e54aa7b6001740\", Created=\"2021-08-04T20:42:59Z\"",
        "X-WSSE":wss_header + ' Content-type: application/json;charset="utf-8"',
        "content-type": "application/json"
      }
    })
    .then(async (response) => {
      //console.log(response);
      return response.data;
    }).catch((error) => {
      //console.log(error);
      return {
        error: true,
        detail: error,
        message: "error connecting emarsys endpoint"
      }
    });

    return axios_call;
  },


  //Service Centers List
  servicecenters: async function(id_owner) {
    
    /*
    let token = await this.login_royal().access_token;
    
    const royal_data = {
      server: process.env.ROYAL_SERVER
    }

    let axios_call =  axios.get(royal_data.server+'/servicecenters', {

    })
    .then(async (response) => {
      //console.log(response);
      return response.data;
    }).catch((error) => {
      //console.log(error);
      return error;
    });    

    return axios_call; 
    */

    let response = {
      data:[
        {
            "cLookupID": 575,
            "cLookupParentID": 98,
            "lookupName": "Servicio Norteamerica",
            "description": "SA"
        },
        {
          "cLookupID": 575,
          "cLookupParentID": 98,
          "lookupName": "Servicio Norteamerica",
          "description": "SA"
        }        
      ]
    };

    return response.data;

  },
  //Listado de las etapas del juego donde se pueden ganar premios.
  reasons2win: async function(id_owner) {  

    let response = {
      data:[
        {
          "updateDate": null,
          "reasonId": 1,
          "reasonDescription": "IDP Con CDP",
          "createDate": "2021-01-12T00:06:38.043",
          "createdBy": "mlopezc",
          "updatedBy": "mlopezc",
          "active": 1
        },
        {
          "updateDate": null,
          "reasonId": 1,
          "reasonDescription": "IDP Con CDP",
          "createDate": "2021-01-12T00:06:38.043",
          "createdBy": "mlopezc",
          "updatedBy": "mlopezc",
          "active": 1
        },        
  
      ]
    };
    return response.data;
  },
  //Lista los niveles de membresía
  membershiplevels: async function(id_owner) {  

    let response = {
      data:[
        {
          "clubPkgTypeID": 230,
          "clubID": 8,
          "pkgType": "Imagine",
          "pointAmount": 9.00
        },
        {
          "clubPkgTypeID": 230,
          "clubID": 8,
          "pkgType": "Imagine",
          "pointAmount": 9.00
        },
  
      ]
    };
    return response.data;
  },  
  //Tipos de Venta de contratos.
  salestype: async function(id_owner) {  

    let response = {
      data:[
        {
          "cLookupID": 1559,
          "cLookupParentID": 21,
          "lookupName": "Upgrade",
          "description": "Upgrade"
        },
        {
          "cLookupID": 1561,
          "cLookupParentID": 21,
          "lookupName": "Original",
          "description": "Original"
        }  
      ]
    };
    return response.data;
  }, 
  //Listado de oficinas o sites
  sitelist: async function(id_owner) {  

    let response = {
      data:[
        {
          "siteID": 290,
          "siteName": "D-Club Cala Migracion",
          "regionID": 29,
          "region": "Puerto Rico",
          "areaID": null,
          "area": "",
          "siteType": "Sales Room",
          "siteTypeID": 720,
          "siteStatus": "Active",
          "siteStatusID": 730
        },
        {
          "siteID": 290,
          "siteName": "D-Club Cala Migracion",
          "regionID": 29,
          "region": "Puerto Rico",
          "areaID": null,
          "area": "",
          "siteType": "Sales Room",
          "siteTypeID": 720,
          "siteStatus": "Active",
          "siteStatusID": 730
        }  
      ]
    };
    return response.data;
  },    
  //Lista los certificados de tipo Welcome Kit
  certificateswklist: async function(id_owner) {  

    let response = {
      data:[
        {
          "incentiveId": 323,
          "codeInc": 171,
          "descIncentive": "Welcome Kit Upgrade Unidad",
          "typeIncentive": "W",
          "applyToRCI": 0,
          "unitUpgrage": 1,
          "welcomeKit": 1
        },
        {
          "incentiveId": 323,
          "codeInc": 171,
          "descIncentive": "Welcome Kit Upgrade Unidad",
          "typeIncentive": "W",
          "applyToRCI": 0,
          "unitUpgrage": 1,
          "welcomeKit": 1
        }  
      ]
    };
    return response.data;
  },      
  //Listado de ejecutivos
  stewards: async function(id_owner) {  

    let response = {
      data:[
        {
          "personnelId": 17802,
          "userName": "akleiner",
          "firstName": "Adriana Paola",
          "lastName": "Kleiner",
          "departmentId": 0,
          "department": "",
          "titleId": 92,
          "personnelstatus": "Employed",
          "personnelstatusId": 379,
          "title": "Ejecutivo CC",
          "email": "akleiner@royal-holiday.net"
        },
        {
          "personnelId": 17802,
          "userName": "akleiner",
          "firstName": "Adriana Paola",
          "lastName": "Kleiner",
          "departmentId": 0,
          "department": "",
          "titleId": 92,
          "personnelstatus": "Employed",
          "personnelstatusId": 379,
          "title": "Ejecutivo CC",
          "email": "akleiner@royal-holiday.net"
        }
      ]
    };
    return response.data;
  },
  //Catálogo de las encuestas disponibles
  surveycatalog: async function(){  

    let response = {
      data:[
        {
          "surveyId": 1,
          "surveyName": "WC1/Profile",
          "surveyDescription": "WC1/Profile",
          "filterByCampaign": 0,
          "surveyQuestions": []
        },
        {
          "surveyId": 1,
          "surveyName": "WC1/Profile",
          "surveyDescription": "WC1/Profile",
          "filterByCampaign": 0,
          "surveyQuestions": []
        },  
      ]
    };
    return response.data;
  },
  /*
  Catálogo de las preguntas por survey y 
  las opciones de respuesta de cada pregunta. 
  Las que no cuentan con opciones de respuesta 
  son respuestas abiertas.
  */
  questionsandanswers: async function(surveyId){  

    let response = {

      data:[
        {
          "surveyId": 4,
          "surveyName": "Welcome Call 1",
          "surveyQuestionID": 21,
          "surveyQuestionDesc": "Age",
          "questionValueID": 109,
          "listOrder": 1,
          "questionVal": "25-30"
        }
      ]
    };
    return response.data;
  },
  //Indica si la encuesta ha sido respondida en su totalidad
  issurveyanswered: async function(ownerId,surveyId){  
    /*
      ownerId: Identificador del socio
      surveyId: Clave del survey a validar

      La respuesta es un campo boolean. 
      true – Survey respondido
      false – Survey no respondido

    */
    let response = {
      data:true
    };
    return response.data;
  },
  //Manda mail de campaña
  sendcampaignmail: async function (campaign, data){

    const user = 'royalholiday005';
    const secret = 'AUi6vsXytkfuvLMsnbrZ';
    
    let wss_header = getWsseHeader(user,secret);

    let axios_call = await axios.post('https://api.emarsys.net/api/v2/email/'+campaign+'/broadcast',    
    JSON.stringify(data),
    {
      headers: {
        "X-WSSE":wss_header + ' Content-type: application/json;charset="utf-8"',
        "content-type": "application/json"
      }
    })
    .then(async (response) => {
      //console.log(response);
      return response.data;
    }).catch((error) => {
      //console.log(error);
      return {
        error: true,
        detail: error,
        message: "error connecting emarsys endpoint"
      }
    });

    return axios_call;    
  },

  //Guarda info para contactar después
  save_contact_item: async function(contact_info, owner_id, contract_id, DateDay, DateTime){
    
    let token = await this.login_royal();
    
    if(token.access_token){

      /*
        {​
          "ContactTypeId":86,
          "OwnerId":1482543,
          "ContractId":422448,
          "DateDay":"2021-10-27",
          "DateTime":"17:15",
          "ContactNote":"de 14 a 15 pm :)"
        }​
      */

      let axios_call = await axios.post(process.env.ROYAL_SERVER+'/Contacts/saveContact',
      {
        "ContactTypeId":2,
        "OwnerId":owner_id,
        "ContractId":contract_id,
        "ContactNote":contact_info,
        "DateDay":DateDay,
        "DateTime":DateTime,        
      },
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        console.log(response);
        return response.data;
      }).catch((error) => {
        console.log("error " + error);
        return {
          error: true,
          detail: error,
          message: "error connecting save contact endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
  },

  //Save contact item
  automized_payments: async function(contact_info, owner_id, contract_id){ 
  
    let token = await this.login_royal();
    if(token.access_token){
      
      let axios_call = await axios.post(process.env.ROYAL_SERVER+'/Contacts/saveContact',
      {
        "ContactTypeId":87,
        "OwnerId":owner_id,
        "ContractId":contract_id,
        "ContactNote":contact_info,
        "DateDay":"",
        "DateTime":"",        
      },
      {        
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        console.log(response);
        return response.data;
      }).catch((error) => {
        console.log("error " + error);
        return {
          error: true,
          detail: error,
          message: "error connecting automized_payments endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
      
  },  

  //Registra los premios del usuario
  earned_prizes: async function(owner_id){ 
  
    let token = await this.login_royal();
    if(token.access_token){
      
      let axios_call = await axios.get(process.env.ROYAL_SERVER+'/WKGralInfo/getwonprizesbyowner?ownerId=' + owner_id,
      {
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        }
      })
      .then(async (response) => {
        //console.log(response);
        return response.data;
      }).catch((error) => {
        //console.log("error " + error);
        return {
          error: true,
          detail: error,
          message: "error connecting getwonprizesbyowner endpoint"
        }
      });    
    
      return axios_call; 

    }else{
      return {
        error: true,
        message: "error connecting to royal systems"
      }
    }
      
  },  

}  


function getWsseHeader(user, secret) {
  let nonce = crypto.randomBytes(16).toString('hex');
  let timestamp = iso8601.fromDate(new Date());

  let digest = base64Sha1(nonce + timestamp + secret);

  return `Username="${user}", PasswordDigest="${digest}", Nonce="${nonce}", Created="${timestamp}"`
};

function base64Sha1(str) {
  let hexDigest = crypto.createHash('sha1')
    .update(str)
    .digest('hex');

  return new Buffer(hexDigest).toString('base64');
};