
//Models
const time_played = require('../../v1/models/time_played');
const Time = require('../../v1/models/time_played');


module.exports = {
	
    //Save user time played on a game
    save_time: (req, res) => {
        
        //Data received from body
        const { id_game, time } = req.body;

        //gamer decoded information
        const gamer_info = req.decoded;

        let time_info = {
            id_game: id_game, 
            id_gamer: gamer_info.id,
            time_played: time
        }

        Time.create(time_info).then( async created_time => {

            return res.status(200).send({
                data: {
                    time_info:time_info
                },
                message:"Time successfully saved",
                status: "success"
            });            

        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error saving time",
                status: "error"
            });
            
        });
    },

    //Get total time played on a game by an user
    time_played_game_user: (req, res) => {
        //Data received from body
        const { id_game, id_gamer } = req.body;        

        Time.sum('time_played', {where : {id_game: id_game, id_gamer:id_gamer}})
        .then( time_played => {
            return res.status(200).send({
                data: {
                    time_played:time_played
                },
                message:"Time successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error saving time",
                status: "error"
            });
        })
    },    

    //Get the total time played on a game
    time_played_game: (req, res) => {
        
        //Data received from body
        let id_game = req.params.id_game

        Time.sum('time_played', {where : {id_game: id_game}})
        .then( time_played => {
            return res.status(200).send({
                data: {
                    time_played:time_played
                },
                message:"Time successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Time saving score",
                status: "error"
            });
        })

    }  

}        