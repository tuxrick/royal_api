
//Models
const Session = require('../../v1/models/sessions');

module.exports = {
	
    //Save user session time played
    save_session: (req, res) => {
        
        //Data received from body
        const {  time } = req.body;

        //gamer decoded information
        const gamer_info = req.decoded;

        let session_info = {
            id_gamer: gamer_info.id, 
            time: time,
            date: new Date()
        }

        Session.create(session_info).then( async session => {

            return res.status(200).send({
                data: {
                    session_info:session
                },
                message:"Session successfully saved",
                status: "success"
            });            

        }).catch(err => {		                
            return res.status(401).send({
                error: err,
                message:"Error saving session",
                status: "error"
            });
        });
    },

    //Get total time played by an user
    total_played_user: (req, res) => {
        //Data received from body
        const { id_gamer } = req.body;        

        Session.sum('time', {where : {id_gamer:id_gamer}})
        .then( total_played => {
            return res.status(200).send({
                data: {
                    total_played:total_played
                },
                message:"Time successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error getting time",
                status: "error"
            });
        })
    },    

    //Get total time played of all users
    total_played_general: (req, res) => {

        Session.sum('time')
        .then( total_played => {
            return res.status(200).send({
                data: {
                    total_played:total_played
                },
                message:"Time successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error getting time",
                status: "error"
            });
        })
    },    

    //List the user sessions
    list_sessions_user: (req, res) => {
        
        //Data received from body
        let id_gamer = req.body.id_gamer

        Session.findAll({
            where: {
                id_gamer: id_gamer
            }
        })
        .then( sessions => {
            return res.status(200).send({
                data: {
                    sessions:sessions
                },
                message:"User sessions successfully delivered",
                status: "success"
            });                
        }).catch(err => {		                
            return res.status(401).send({
                error: err,
                message:"Error getting user sessions",
                status: "error"
            });
        })
    },  

    //list all sessions 
    list_sessions_general: (req, res) => {
        
        Session.findAll()
        .then( sessions => {

            return res.status(200).send({
                data: {
                    sessions:sessions
                },
                message:"All sessions successfully delivered",
                status: "success"
            });                

        }).catch(err => {		                
            return res.status(401).send({
                error: err,
                message:"Error getting user sessions",
                status: "error"
            });
        })
    }      

}        