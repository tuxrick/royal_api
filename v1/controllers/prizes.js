//Models
const Prizes = require('../../v1/models/prizes');
const User_prizes = require('../../v1/models/user_prizes');
//Api royal util
const api_royal = require('../../v1/api_royal.js');

module.exports = {

    //List all available prizes
    list_prizes: (req, res) => {
        
        Prizes.findAll().then( prizes => {

            return res.status(200).send({
                data: {
                    prizes:prizes
                },
                message:"Prizes successfully delivered",
                status: "success"
            });            

        }).catch(err => {
            return res.status(401).send({
                error: err,
                message:"Error getting prizes",
                status: "error"
            });
            
        });
    },

    //List all user prizes
    list_user_prizes: (req, res) => {
        
        //let id_gamer = req.params.id_gamer;
        
        const gamer_info = req.decoded;

        User_prizes.findAll({
            where: {
              id_gamer:gamer_info.id 
            }
            }).then( prizes => {

            return res.status(200).send({
                data: {
                    prizes:prizes
                },
                message:"Prizes successfully delivered",
                status: "success"
            });            

        }).catch(err => {
            return res.status(401).send({
                error: err,
                message:"Error getting prizes",
                status: "error"
            });
            
        });
    },    

    //Save user prize
    save_user_prize: async (req, res) => {
        
        //Data received from body        
        const { id_prize } = req.body;

        //gamer decoded information
        const gamer_info = req.decoded;

        let prize_info = {
            id_gamer: gamer_info.id,
            id_prize: id_prize,
            date: new Date()
        }

        let dismiss = req.body.dismiss; 

        if(
            (dismiss != "")&&
            (dismiss != null)&&
            (dismiss != undefined)&&
            (dismiss != "undefined")
        ){
            dismiss = dismiss;
        }else{
            dismiss = "";
        }
    

        //Http call to royal api to save prize 
        let user_prize = await api_royal.registerprizes(gamer_info.id_owner, gamer_info.id_contract, id_prize, dismiss);
        //console.log(user_data);        
        
        if(user_prize.error == true){
            return res.status(401).send({
                message:user_prize.message,
                error:user_prize.datail,
                status: "error"  
            });
        }

        //if(user_prize.incFol !== 0){
            User_prizes.create(prize_info).then( async created_prize => {

                //http call to royal api to send mail
                //let sendprizemail = api_royal.sendprizemail(owner_id, name, prize_id)


                return res.status(200).send({
                    data: {
                        prize_info:prize_info
                    },
                    message:"User prize successfully saved",
                    status: "success"
                });            
    
            }).catch(err => {
                            
                return res.status(401).send({
                    error: err,
                    message:"Error saving prize",
                    status: "error"
                });
                
            });
        /*
        }else{
            return res.status(200).send({
                data: {},
                message:"Price already delivered",
                status: "success"
            });            
        }
        */
        
    },

}        