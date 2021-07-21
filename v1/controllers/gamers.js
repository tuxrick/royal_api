//Libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../../database/db.js');
const randomize = require('randomatic');

//Api royal util
const api_royal = require('../../v1/api_royal.js');

//Models
const Gamer = require('../../v1/models/gamers');
const User = require('../../v1/models/users');
const { create } = require('express-handlebars');

module.exports = {

    info: async (req, res) => {

	    let id_owner = req.params.owner_id;	            
        //Check if the user exists on royal by an http request directly to royal 
        let user_data = await api_royal.WKGralInfo(id_owner);
        //console.log(user_data);        

        if(user_data.ownerDetail.ownerID !== undefined){

            return res.status(200).send({
                data: user_data,
                message:"Successfull request",
                status: "success"  
            });

        }else{
            return res.status(401).send({
                message:"User not found in royal servers",
                status: "error"  
            });            
        }

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
                console.log("date validation result" + valid_date);                

                if((valid_date == false) && (gamer.code == code)){


                    //Update validation email field 

                    let token = jwt.sign({
                        id:gamer.id, 
                        id_owner:gamer.id_owner, 
                        first_name:gamer.first_name,
                        last_name:gamer.last_name, 
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
                    res.status(401).json({ 
                        data: "",
                        message: "Wrong or expirated code",
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
        const { email, phone } = req.body;
        
        //Get royal user to see if exsits 
        let user_data = await api_royal.WKGralInfo(id_owner);
        //console.log(user_data);        

        if(user_data.ownerDetail.ownerID !== undefined){


            //Http request to the royal db to update user's email

            //Http request to the royal db to update user's phone



            //Create gamer if it desn't exists on game db
            //Get the user from DB
            Gamer.findOne({
                where: {
                    id_owner: id_owner
                }
            }).then(async gamer => {
                
                console.log("///////////////////////////////");
                console.log(JSON.stringify(gamer));

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
                        //We use email and phone received from the user
                        email: email,
                        phone: phone,
                        birthdate: user_data.ownerDetail.birthdate,
                        preferred_languaje: user_data.ownerDetail.preferredLanguage,
                        welcome_call_one: user_data.ownerDetail.isWC1Answered,
                        welcome_call_two: user_data.ownerDetail.isWC2Answered,
                        validated_email: false,
                        id_avatar: 0,
                        code: 000000,
                        expiration_time: Date.now(),
                        answered_survey: 0
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
                            status: "error"
                        })
                    })

                                       
                }
            }).catch(err => {
                res.status(401).json({ 
                    data: err,
                    status: "error"
                })
	        });

        }else{
            return res.status(401).send({
                message:"User not found in royal servers",
                status: "error"  
            });            
        }

    },

    //Save user survey
    save_survey: async (req, res) => {
        
        let id_owner = req.params.owner_id;
        //Survey answers received by the user
        let { age, web_user, travel_with, best_time_to_contact } = req.body;

        //preparing the answers to the final request 
        let answers = {
            OwnerID: id_owner,
            SurveyId: 4,//To validate
            AnswerValues:[
                {
                    SurveyQuestionId:21,
                    AnswerValue: age
                },
                /*
                {
                    SurveyQuestionId:25,
                    AnswerValue: web_user
                },
                {
                    SurveyQuestionId:23,
                    AnswerValue: travel_with
                },
                */
                {
                    SurveyQuestionId:23,
                    AnswerValue: best_time_to_contact
                },                        
            ]
        }

        //http request to answer the survey (savesurveyanswers)
        
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

