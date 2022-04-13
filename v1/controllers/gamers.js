//Libraries
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');
const db = require('../../database/db.js');

//Api royal util
const api_royal = require('../../v1/api_royal.js');

//Models
const Gamer = require('../../v1/models/gamers');
const User = require('../../v1/models/users');
const UserSkin = require('../../v1/models/user_skins');

module.exports = {

    info: async (req, res) => {

	    let id_owner = req.params.owner_id;	            
        
        //Check if user already exists on local game DB 
        //Getting gamer info 
	    Gamer.findOne({
	        where: {
                id_owner:id_owner
	        }
	    }).then(async gamer => {

            

            if(gamer){

                //Check if the user exists on royal by an http request directly to royal 
                let user_data = await api_royal.WKGralInfo(id_owner);
                
                if(user_data.error == true){
                    return res.status(401).send({
                        message:user_data.message,
                        error:user_data.datail,
                        status: "error"  
                    });             
                }

                user_data.ownerDetail.email = gamer.email; 
                user_data.ownerDetail.phone1 = gamer.phone;
                user_data.answered_survey = gamer.answered_survey;
                user_data.latestDate = gamer.latestDate;

                if(user_data.ownerDetail.ownerID !== undefined){

                    let prizes_data = await api_royal.earned_prizes(id_owner);
                
                    if(prizes_data.error == true){
                        return res.status(401).send({
                            message:prizes_data.message,
                            error:prizes_data.datail,
                            status: "error"  
                        });             
                    }

                    let compiled_rewards = {
                        total_nights: prizes_data[0].nightsWon,
                        total_upgrades: prizes_data[0].upgradesWon,
                        total_rewards: prizes_data[0].rewardsWon,
                        used_upgrades: prizes_data[0].upgradesUSed,
                        used_nights: prizes_data[0].nightsUsed,
                        used_rewards: prizes_data[0].rewardsUsed
                    }
                    
                    /*
                    for(let i=0; i<prizes_data.length; i++){
                        compiled_rewards.total_nights += prizes_data[i].nights;
                        compiled_rewards.total_upgrades += prizes_data[i].unitUpgrade;
                        compiled_rewards.total_rewards += prizes_data[i].pointsRewards;
                        if(prizes_data[i].used == 1){
                            compiled_rewards.used_rewards +=  prizes_data[i].pointsRewards;
                            compiled_rewards.used_nights += prizes_data[i].nights;
                            if(prizes_data[i].unitUpgrade != 0){
                                compiled_rewards.used_upgrades += 1;
                            }
                        }
                    }
                    */

                    return res.status(200).send({
                        data: {
                            user_data,
                            prizes_data,
                            compiled_rewards
                        },
                        message:"Successfull request",
                        status: "success"  
                    });

                }else{
                    return res.status(401).send({
                        message:"User not found in royal servers",
                        status: "error"  
                    });            
                }

            }else{

                //Check if the user exists on royal by an http request directly to royal 
                let user_data = await api_royal.WKGralInfo(id_owner);

                console.log(user_data);

                if(user_data.error == true){
                    return res.status(401).send({
                        message:user_data.message,
                        error:user_data.datail,
                        status: "error"  
                    });             
                }

                if(user_data.ownerDetail.ownerID !== undefined){

                    user_data.answered_survey = false;
                    user_data.latestDate = new Date();

                    let prizes_data = await api_royal.earned_prizes(id_owner);
                
                    if(prizes_data.error == true){
                        return res.status(401).send({
                            message:prizes_data.message,
                            error:prizes_data.datail,
                            status: "error"  
                        });             
                    }

                    let compiled_rewards = {
                        total_nights: prizes_data[0].nightsWon,
                        total_upgrades: prizes_data[0].upgradesWon,
                        total_rewards: prizes_data[0].rewardsWon,
                        used_upgrades: prizes_data[0].upgradesUSed,
                        used_nights: prizes_data[0].nightsUsed,
                        used_rewards: prizes_data[0].rewardsUsed
                    }
                    
                    /*
                    for(let i=0; i<prizes_data.length; i++){
                        compiled_rewards.total_nights += prizes_data[i].nights;
                        compiled_rewards.total_upgrades += prizes_data[i].unitUpgrade;
                        compiled_rewards.total_rewards += prizes_data[i].pointsRewards;
                        if(prizes_data[i].used == 1){
                            compiled_rewards.used_rewards +=  prizes_data[i].pointsRewards;
                            compiled_rewards.used_nights += prizes_data[i].nights;
                            if(prizes_data[i].unitUpgrade != 0){
                                compiled_rewards.used_upgrades += 1;
                            }
                        }
                    }
                    */
                    

                    return res.status(200).send({
                        data: {
                            user_data,
                            prizes_data,
                            compiled_rewards
                        },
                        message:"Successfull request",
                        status: "success"  
                    });

                }else{
                    return res.status(401).send({
                        message:"User not found in royal servers",
                        status: "error"  
                    });            
                }

            }
        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message:"Error getting the gamer",
                status: "error"
            })
        });

    },
    
    //Send confitmation code
    send_confirmation_code: async (req, res) => {

        let id_owner = req.params.owner_id;

        //Getting user info
        let user_data = await api_royal.WKGralInfo(id_owner);

        //Check if user exists in royal system 
        if(user_data.ownerDetail.ownerID !== undefined){
            //Get the user from DB
            Gamer.findOne({
                where: {
                    id_owner: id_owner
                }
            }).then(async gamer => {
                //If there is not gamer on the DB
                if (!gamer) {
                    //We create the user with the info from the system                    

                    let gamer_info = {
                        id_owner: user_data.ownerDetail.ownerID,
                        id_site: user_data.ownerDetail.siteID,
                        id_contract: user_data.contracts[0].contractId,
                        id_owner_type: user_data.ownerDetail.ownerTypeID,
                        ownertype: user_data.ownerDetail.ownerType,
                        ownerstatus: user_data.ownerDetail.ownerStatus,
                        salutation: user_data.ownerDetail.salutation,
                        company: user_data.ownerDetail.company,
                        first_name: user_data.ownerDetail.firstName,
                        last_name: user_data.ownerDetail.lastName,
                        city: user_data.ownerDetail.city,
                        country: user_data.ownerDetail.country,
                        state: user_data.ownerDetail.state,
                        email: user_data.ownerDetail.emails[0].emailOwner,
                        birthdate: user_data.ownerDetail.birthdate,
                        preferred_languaje: user_data.ownerDetail.preferredLanguage,
                        phone: user_data.ownerDetail.phones[0].phoneNumber,
                        welcome_call_one: user_data.ownerDetail.isWC1Answered,
                        welcome_call_two: user_data.ownerDetail.isWC2Answered,
                        validated_email: false,
                        id_avatar: 0,
                        code: 000000,
                        expiration_time: Date.now(),
                        answered_survey: 0
                    }

	                Gamer.create(gamer_info).then( async created_gamer => {
                        
                        //Once the gamer is created 
                        //Generate the code
                        //Update the gamer table with de code and expiration time
                        let code = await generateCodeAndUpdate(id_owner);
                        
                        //Error if gamer is not correctly updated 
                        if (code == "error"){
                            return res.status(401).send({
                                message:"Error generating and saving gamer code",
                                status: "error"
                            });                            
                        }                

                        console.log("////////////////////////////////");
                        console.log(created_gamer);

                        //Enviar código de plantilla de correo con id de plantilla
                        //send_code (id_owner, code, ...)                        
                        let sendcodemail = await api_royal.sendcodemail(gamer_info.email, gamer_info.id_owner, gamer_info.first_name, gamer_info.last_name, code.code);

                        created_gamer.code = code.code;
                        created_gamer.expiration_time = code.expiration_time;

                        //Enviar respuesta y código
	                    return res.status(200).send({
                            data: {
                                code: code.code,
                                gamer_data: created_gamer
                            },
	                        message:"Gamer successfully created and code sent",
	                        status: "success"
	                    });   

	                }).catch(err => {
		                
	                    return res.status(401).send({
	                        error: err,
	                        message:"Error saving gamer",
	                        status: "error"
	                    });
	                    
	                });                    

                }
                //If the gamer already exists on the local DB
                else{
                    
                    //get gamer info
                    Gamer.findOne({
                        where: {
                            id_owner: id_owner
                        }
                    }).then(async gamer_data => {                    
                    
                        //Generate the code
                        //Update the gamer and send the code and expiration time
                        let code = await generateCodeAndUpdate(id_owner);
                        
                        gamer_data.code = code.code;
                        gamer_data.expiration_time = code.expiration_time;                        

                        //send_code (id_owner, code, ...)                        
                        let sendcodemail = await api_royal.sendcodemail(gamer_data.email, gamer_data.id_owner, gamer_data.first_name , gamer_data.last_name, code.code);

                        return res.status(200).send({
                            data: {
                                code: code.code,
                                gamer_data:gamer_data
                            },
                            message:"Code successfully sent",
                            status: "success"
                        });  

                    }).catch(err => {
                        res.status(401).json({ 
                            data: err,
                            status: "error getting user data"
                        })
                    });                                          
                }
            }).catch(err => {
                res.status(401).json({ 
                    data: err,
                    status: "error"
                })
	        });
        }
        //Return error if user is not in royal system 
        else{
            return res.status(401).send({
                message:"User not found in royal servers",
                status: "error"  
            });            
        }
    },    

    confirm_code: (req, res) => {    
        
        const { code } = req.body;
        const id_owner = req.params.owner_id;

        //Getting gamer info 
	    Gamer.findOne({
	        where: {
	            code: code,
                id_owner:id_owner
	        }
	    }).then(gamer => {

            if (gamer) {

                //Validate expiration and code
                let valid_date = isDateBeforeToday(new Date(gamer.expiration_time));                

                if((valid_date == false) && (gamer.code == code)){


                    //Update validation email field 

                    let token = jwt.sign({
                        id:gamer.id, 
                        id_owner:gamer.id_owner, 
                        email:gamer.email,
                        first_name:gamer.first_name,
                        last_name:gamer.last_name, 
                        id_contract: gamer.id_contract
                    }, 
                    process.env.SECRET_KEY, {
                        expiresIn: '360d'
                    });

                    return res.status(200).send({
                        data: {
                            token:token
                        },
                        message: "Approved code",
                        status: "success"
                    });                    

                }else{
                    let message = "Código incorrecto o expirado/Wrong or invlaid code"; 
                    if(valid_date == true){
                        message = "Expired Code / Código Expirado";
                    }
                    if(gamer.code !== code){
                        message = "Wrong code / Código Incorrectoo";
                    }
                    res.status(401).json({ 
                        data: "",
                        message: message,
                        status: "error"
                    })
                }
                    
            }else{
                res.status(401).json({ 
                    data: "",
                    message: "Wrong code or gamer not found",
                    status: "error"
                })                
            }

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message:"Error getting the gamer",
                status: "error"
            })
        });


    },

    //List gamers
    //Only an admin can list gamers
    list_gamers: (req, res) => {

        //user decoded information
        const user_info = req.decoded;

        //If user is admin
        if(user_info.id_role == 1){
            User.findOne({
                where: {
                    id: user_info.id,
                    email: user_info.email
                }
            }).then(user => {
                
                Gamer.findAll().then(gamers => {
                    
                    return res.status(200).send({
                        data: gamers,
                        message: "Successfull request",
                        status: "success"
                    });  

                }).catch(err => {
                    res.status(401).json({ 
                        data: err,
                        message:"Error getting gamers",
                        status: "error"
                    });            
                });


            }).catch(err => {
                res.status(401).json({ 
                    data: err,
                    message:"Error getting user",
                    status: "error"
                });            
            });
        }
        //If user is not admin
        else{
            res.status(401).json({ 
                data: {},
                message:"Yo don't have permissions to see this",
                status: "error"
            });            
        }

    },

    //Update gamer info 
    //Only email and phone are updated on royal system and the game system
    //User must exist on royal system 
    //If user is not created yet on game system, it is created
    update_gamer: async (req, res) => {
        
        let id_owner = req.params.owner_id;
        const { email, phone, phone_type } = req.body;
        
        //Get royal user to see if exsits 
        let user_data = await api_royal.WKGralInfo(id_owner);
        console.log(user_data);        

        if(user_data.ownerDetail.ownerID !== undefined){


            //Http request to the royal db to update user's email
            let email_data = await api_royal.addemail2owner(id_owner,email);

            if(email_data.error == true){
                return res.status(401).send({
                    message:email_data.message,
                    error:email_data.datail,
                    status: "error"  
                });             
            }                

            //Http request to the royal db to update user's phone            
            let phone_data = await api_royal.addphone2owner(id_owner,phone, phone_type);

            if(phone_data.error == true){
                return res.status(401).send({
                    message:phone_data.message,
                    error:phone_data.datail,
                    status: "error"  
                });             
            }


            //Create gamer if it desn't exists on game db
            //Get the user from DB
            Gamer.findOne({
                where: {
                    id_owner: id_owner
                }
            }).then(async gamer => {
                
                //If there is not gamer on the DB
                if (!gamer) {

                    //console.log("///////////////////////////////");
                    //console.log(JSON.stringify(gamer));

                    //We create the user with the info from the system                    
                    //We use email and phone received from the user
                    
                    let gamer_info = {
                        id_owner: user_data.ownerDetail.ownerID,
                        id_site: user_data.ownerDetail.siteID,
                        id_owner_type: user_data.ownerDetail.ownerTypeID,
                        ownertype: user_data.ownerDetail.ownerType,
                        ownerstatus: user_data.ownerDetail.ownerStatus,
                        salutation: user_data.ownerDetail.salutation,
                        company: user_data.ownerDetail.company,
                        first_name: user_data.ownerDetail.firstName,
                        last_name: user_data.ownerDetail.lastName,
                        city: user_data.ownerDetail.city,
                        country: user_data.ownerDetail.country,
                        state: user_data.ownerDetail.state,
                        email: email,
                        phone: phone,
                        birthdate: user_data.ownerDetail.birthdate,
                        preferred_languaje: user_data.ownerDetail.preferredLanguage,
                        welcome_call_one: user_data.ownerDetail.isWC1Answered,
                        welcome_call_two: user_data.ownerDetail.isWC2Answered,
                        validated_email: false,
                        id_avatar: 0,
                        code: 000000,
                        expiration_time: new Date(),
                        answered_survey: 0
                    }
                    
                    if(user_data.contracts[0] !== undefined){
                        gamer_info.id_contract = user_data.contracts[0].contractId;
                    }else{
                        gamer_info.id_contract = null;
                    }
	                Gamer.create(gamer_info).then( async created_gamer => {
                        
	                    return res.status(200).send({
                            data: {
                                gamer_data:gamer_info
                            },
                            message:"User created and updated",
                            status: "success"
	                    });    
                    
	                }).catch(err => {
		                
	                    return res.status(401).send({
	                        error: err,
	                        message:"Error saving gamer",
	                        status: "error"
	                    });
	                    
	                });                   

                }
                //If the gamer already exists on the local DB
                else{

                    Gamer.update(
                        {
                            email:email,
                            phone: phone
                        },
                        {
                            where:{
                                id_owner: id_owner
                            }
                        }
                    ).then(response => {

	                    return res.status(200).send({
                            data: response,
                            message:"User updated",
                            status: "success"
	                    });    

                    }).catch(err => {
                        res.status(401).json({ 
                            data: err,
                            status: "error pepe"
                        })
                    })

                                       
                }
            }).catch(err => {
                res.status(401).json({ 
                    data: err,
                    status: "error pecas"
                })
	        });

        }else{
            return res.status(401).send({
                message:"User not found in royal servers",
                status: "error pica"  
            });            
        }

    },

    //Save user survey
    save_survey: async (req, res) => {
        
        let id_owner = req.params.owner_id;
        //Survey answers received by the user
        let { age, web_user } = req.body;

        //setting the answers to the final request 
        let answers = {
            OwnerID: id_owner,
            SurveyId: 4,
            AnswerValues:[
                {
                    SurveyQuestionId:21,
                    SurveyAnswerID: age,
                    AnswerValue:"",
                    SurveyResultID:0
                },           
            ]
        };

        //http request to answer the survey (savesurveyanswers)
        let user_answers = await api_royal.savesurveyanswers(answers);

        let user_answer_two = {
            OwnerID: id_owner,
            SurveyId: 4,
            AnswerValues:[
                {
                    SurveyAnswerID: 806,//SI CONTESTA QUE NO ESTE VALOR ES 25 
                    AnswerValue: "Yes",//SI CONTESTA NO ESTE VALOR ES NO
                    SurveyResultID: 0,
                    SurveyQuestionID: 37
           
                },           
            ]
        };
        
        if(web_user == "true"){
            
            user_answer_two.AnswerValues[0].SurveyAnswerID = 806;
            user_answer_two.AnswerValues[0].AnswerValue = "Yes";
        }else{
            
            user_answer_two.AnswerValues[0].SurveyAnswerID = 807;
            user_answer_two.AnswerValues[0].AnswerValue = "No";            
        }

        //http request to answer the survey (savesurveyanswers)
        let user_answers_two = await api_royal.savesurveyanswers(user_answer_two);

/*
INFORMACION PARA GUARDAR WEB USER 
{
    "OwnerId":12345,
    "SurveyId":1,
    "AnswerValues":
    [   {
        "SurveyAnswerID": 24,//SI CONTESTA QUE NO ESTE VALOR ES 25 
         "AnswerValue": "Yes",//SI CONTESTA NO ESTE VALOR ES NO
        "SurveyResultID": 0,
        "SurveyQuestionID": 4
       
        } 
    ]

}
*/


        //console.log(user_data);        
        
        if(user_answers.error == true){
        
            return res.status(401).send({
                message:user_answers.message,
                error:user_answers.datail,
                status: "error"  
            });             
           
        }

        if(user_answers_two.error == true){
        
            return res.status(401).send({
                message:user_answers.message,
                error:user_answers.datail,
                status: "error"  
            });             
           
        }        

        //updating, user answered survey on local game db 
        Gamer.update(
            {
                answered_survey:true
            },
            {
                where:{
                    id_owner: id_owner
                }
            }
        ).then(response => {

            return res.status(200).send({
                data: response,
                message:"Survey correctly answered",
                status: "success"
            });    

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                status: "error"
            })
        })

    },
    //Send email to user 
    send_campaign_mail: async (req, res) => {
        let campaign = req.params.campaign;
        const user_info = req.decoded;
        
        let data = {
            "email": user_info.email,
            "data": {
                "global":{
                    "Nombre": user_info.first_name,
                    "OwnerID": user_info.id_owner,
                }
            }
        };

        if(
            (campaign == 3097169)||
            (campaign == 3097260)||
            (campaign == 3097263)||
            (campaign == 3097287)||
            (campaign == 3097290)||
            (campaign == 3097264)||
            (campaign == 3097289)||
            (campaign == 3097288)||
            (campaign == 3097265)
        ){
            data = {
                "email": user_info.email,
                "data": {
                    "global":{
                        "Nombre": user_info.first_name,
                        "OwnerID": user_info.id_owner,
                        "montostars":"1000000",
                        "montorewards":"5000"
                    }
                }
            };            
        }

        let sendcodemail = await api_royal.sendcampaignmail(campaign, data);

        return res.status(200).send({
            data: sendcodemail,
            message: "Successfull request",
            status: "success"
        });  
    },

    //Set Skin
    set_skin: async (req, res) => {
        
        let id_skin  = req.body.id_skin;
        let user_info= req.decoded;


        Gamer.update(
            {
                id_avatar: id_skin
            },
            {
                where:{
                    id_owner: user_info.id_owner
                }
            }
        ).then(response => {

            return res.status(200).send({
                data: response,
                message:"User updated",
                status: "success"
            });    

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                status: "error"
            })
        });

    },

    //Unlock Skin
    unlock_skin:(req,res) => {
        let id_skin = req.body.id_skin;
        let user_info = req.decoded;
        let skin_info = {
            id_gamer:user_info.id,
            id_skin: id_skin
        }


        UserSkin.findAll({
            where: {
                id_gamer: user_info.id,
                id_skin: id_skin
            }
        }).then( user_skins => {

            console.log(user_skins);

            //Scenario where the user don't have the skin
            if(user_skins.length == 0){

                UserSkin.create(skin_info).then(unlocked_skin => {
                    return res.status(200).send({
                        data: unlocked_skin,
                        message:"Skin unlocked",
                        status: "success"
                    });              
        
                }).catch(err => {
                    res.status(401).json({ 
                        data: err,
                        message: "error saving skin",
                        status: "error"
                    })
                });
                        

            }else{
                return res.status(200).send({
                    data: '',
                    message:"Skin already unlocked",
                    status: "success"
                });                              
            }

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message: "error getting skin",
                status: "error"
            })
        });

        
    },

    //List of user skins
    list_user_skins: (req,res)=>{

        let user_info = req.decoded;

        UserSkin.findAll({
            where: {
                id_gamer: user_info.id
            }
        }).then(async gamer_skins => {
            
            let skin_list = []; 
            for(let i= 0; i<gamer_skins.length ; i++){
                skin_list.push(gamer_skins[i].id_skin);
            }

            return res.status(200).send({
                data: skin_list,
                message:"Skins listed",
                status: "success"
            });                 

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message: "error listing user skins",
                status: "error"
            })
        });
    },

    //List of gamers and last connections
    active_gamers: (req,res)=>{

        let id_owner = req.body.id_owner;

        let query = 'SELECT gamers.id_owner, MAX(date) AS last_conn FROM gamers LEFT JOIN sessions ON gamers.id = sessions.id_gamer ';

        console.log("owner" + id_owner);

        if(
            (id_owner != "")&&
            (id_owner != null)&&
            (id_owner != undefined)&&
            (id_owner != "undefined")
        ){
            query += " WHERE gamers.id_owner = " + id_owner;
        }

        query += " GROUP BY gamers.id_owner";

        db.sequelize.query(query)
        .then(result => {
            res.status(200).json({ 
                data: result[0],
                status: "success"
            });					
        }).catch(err => {
            res.status(200).json({ 
                data: err,
                status: "error"
            });
        })

    },

    save_contact_item: async (req,res)=>{

        let {contact_info,date_day,date_time}= req.body;

        const user_info = req.decoded;

        let user_contact = await api_royal.save_contact_item(contact_info, user_info.id_owner, user_info.id_contract,date_day,date_time);
        
        
        if(user_contact.error == true){
        
            return res.status(401).send({
                message:user_contact.message,
                error:user_contact.datail,
                status: "error"  
            });             
           
        }else{
            return res.status(200).send({
                data: "",
                message:"Contact correctly answered",
                status: "success"
            });             
        }         

    },

    automized_payments_format: async (req,res)=>{

        let contact_info= req.body.contact_info;
        const user_info = req.decoded;

        let user_contact = await api_royal.automized_payments(contact_info, user_info.id_owner, user_info.id_contract);
        
        
        if(user_contact.error == true){
        
            return res.status(401).send({
                message:user_contact.message,
                error:user_contact.datail,
                status: "error"  
            });             
           
        }else{
            return res.status(200).send({
                data: "",
                message:"Automized payments correctly answered",
                status: "success"
            });             
        }         

    },          

    update_progress:(req,res)=>{
        let {key, value}= req.body;
        let user_info = req.decoded;

	    Gamer.findOne({
	        where: {
                id:user_info.id
	        }
	    }).then(async gamer => {

            let progress = gamer.saved_progress;

            progress[key] = value;

            Gamer.update({
                    saved_progress: progress
                },
                {
                    where:{
                        id: user_info.id
                    }
                }
            ).then(response => {
    
                return res.status(200).send({
                    data: response,
                    message:"Progress updated",
                    status: "success"
                });    
    
            }).catch(err => {
                res.status(401).json({ 
                    data: err,
                    status: "error"
                })
            });            

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message: "error getting user progress",
                status: "error"
            })            
        })
    },

    get_gamer_progress:(req,res)=>{

        let user_info = req.decoded;

	    Gamer.findOne({
	        where: {
                id:user_info.id
	        }
	    }).then(async gamer => {

            let progress = gamer.saved_progress;

            return res.status(200).send({
                data: progress,
                message:"Progress request completed",
                status: "success"
            });    

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                message: "error getting user progress",
                status: "error"
            })            
        });
    },
    
    get_last_connection: (req,res)=>{

        let id_owner = req.body.id_owner;

        let query = 'SELECT MAX(t1.id) as id, gamers.id_owner, t1.id_gamer, MAX(time) as latest ,MAX(t1.date) as last_date FROM sessions t1 inner join gamers on gamers.id = t1.id_gamer ';

        if(
            (id_owner != "")&&
            (id_owner != null)&&
            (id_owner != undefined)&&
            (id_owner != "undefined")
        ){
            query += " AND gamers.id_owner = "+ id_owner ;
        }

        query += " GROUP BY id_gamer";

        db.sequelize.query(query)
        .then(result => {
            res.status(200).json({ 
                data: result[0],
                status: "success"
            });					
        }).catch(err => {
            res.status(200).json({ 
                data: err,
                status: "error"
            });
        })

    },

    update_languaje: (req,res)=>{

        let languaje = req.body.languaje;
        let id_owner = req.body.id_owner;

        Gamer.update(
            {
                languaje:languaje
            },
            {
                where:{
                    id_owner: id_owner
                }
            }
        ).then(response => {

            return res.status(200).send({
                data: response,
                message:"Gamer languaje updated",
                status: "success"
            });    

        }).catch(err => {
            res.status(401).json({ 
                data: err,
                status: "error"
            })
        })

    }



}


//Not exported resources (local utils)

function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function generateCodeAndUpdate(id_owner){
    
    //Let's generate the code first 
    let code = randomize('0', 6);
    let exp_time = addDays(Date.now(), 4);
    //Let's update the user
    let updated_user = Gamer.update(
        {
            code:code,
            expiration_time: exp_time
        },
        {
            where:{
                id_owner: id_owner
            }
        }
    ).then(response => {
        return {
            code:code,
            exp_time: exp_time
        };
    })
    .catch(function (err) {
        return "error";
    });		    

    return updated_user;
}

