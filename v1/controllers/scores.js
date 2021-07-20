
//Models
const Score = require('../../v1/models/scores');


module.exports = {
	
    //Save user score
    save_score: (req, res) => {
        
        //Data received from body
        const { id_game, score, level } = req.body;

        //gamer decoded information
        const gamer_info = req.decoded;

        let score_info = {
            id_game: id_game, 
            id_gamer: gamer_info.id,
            score: score,
            level: level, 
            date: new Date()
        }

        Score.create(score_info).then( async created_score => {

            return res.status(200).send({
                data: {
                    score_info:score_info
                },
                message:"Score successfully saved",
                status: "success"
            });            

        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error saving score",
                status: "error"
            });
            
        });
    },

    //Get max score from user in a game 
    max_score_game_user: (req, res) => {
        //Data received from body
        const { id_game, id_gamer } = req.body;        

        Score.max('score', {where : {id_game: id_game, id_gamer:id_gamer}})
        .then( max_score => {
            return res.status(200).send({
                data: {
                    max_score:max_score
                },
                message:"Score successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error saving score",
                status: "error"
            });
        })
    },    

    //Get max score from user in a game 
    max_score_game: (req, res) => {
        
        //Data received from body
        let id_game = req.params.id_game

        Score.max('score', {where : {id_game: id_game}})
        .then( max_score => {
            return res.status(200).send({
                data: {
                    max_score:max_score
                },
                message:"Score successfully delivered",
                status: "success"
            });                 
        }).catch(err => {
		                
            return res.status(401).send({
                error: err,
                message:"Error saving score",
                status: "error"
            });
        })

    }  


}        