//Models
const Prizes = require('../../v1/models/prizes');
const User_prizes = require('../../v1/models/user_prizes');

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
        
        let id_gamer = req.params.id_gamer;

        User_prizes.findAll({
            where: {
              id_gamer:id_gamer 
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
    save_user_prize: (req, res) => {
    
        //Data received from body
        const { id_prize } = req.body;

        //gamer decoded information
        const gamer_info = req.decoded;

        let prize_info = {
            id_gamer: gamer_info.id,
            id_prize: id_prize,
            date: new Date()
        }

        //Http call to royal api to save prize 
        //http call to royal api to send mail

        User_prizes.create(prize_info).then( async created_prize => {

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
    },

}        