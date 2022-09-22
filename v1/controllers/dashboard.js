//Api royal util
const api_royal = require('../../v1/api_royal.js');
//Models
//const gamer = require('../../v1/models/gamer.js');
const db = require('../../database/db.js');


module.exports = {
    servicecenters: async (req, res) => {

        let data = await api_royal.servicecenters();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },
    
    sitelist: async (req, res) => {

        let data = await api_royal.sitelist();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    membershiplevels: async (req, res) => {

        let data = await api_royal.membershiplevels();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    salestype: async (req, res) => {

        let data = await api_royal.salestype();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    stewards: async (req, res) => {

        let data = await api_royal.stewards();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    reasons2win: async (req, res) => {

        let data = await api_royal.reasons2win();
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    Maindashboard: async (req, res) => {

        let params = req.body; 
        let data = await api_royal.Maindashboard(params);
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    dashboardgeneralinfo: async (req, res) => {

        let params = req.body; 
        let data = await api_royal.dashboardgeneralinfo(params);

        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    dashboardsalesinfo: async (req, res) => {

        let params = req.body; 
        let data = await api_royal.dashboardsalesinfo(params);
                
        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    PrizesWonPerSite: async (req, res) => {

        let params = req.body; 
        let data = await api_royal.PrizesWonPerSite(params);


        if(data.error == true){
            return res.status(401).send({
                message:data.message,
                error:data.datail,
                status: "error"  
            });             
        }

        return res.status(200).send({
            message:"successfull request",
            data:data,
            status: "success"  
        });

    },

    gameData: async (req, res) => {
        let game_data = await db.sequelize.query("SELECT id, id_owner, (SELECT count(*) FROM time_played WHERE time_played.id_gamer = id) AS intermitencies, (SELECT time_played.time_played FROM time_played WHERE time_played.id_gamer = id) AS last_connection_time, (SELECT SEC_TO_TIME( SUM(time_to_sec(time_played))) FROM time_played WHERE time_played.id_gamer = id) AS total_time_played, (SELECT sessions.date FROM sessions WHERE sessions.id_gamer = id ORDER BY id DESC LIMIT 1) AS last_session, ownerstatus, (SELECT JSON_EXTRACT(saved_progress, '$.Ha'))AS Ha, (SELECT JSON_EXTRACT(saved_progress, '$.We'))AS We, (SELECT JSON_EXTRACT(saved_progress, '$.Ea'))AS Ea, (SELECT JSON_EXTRACT(saved_progress, '$.Me'))AS Me, (SELECT JSON_EXTRACT(saved_progress, '$.Ca'))AS Ca, (SELECT JSON_EXTRACT(saved_progress, '$.Su'))AS Su, (SELECT JSON_EXTRACT(saved_progress, '$.Eu'))AS Eu, (SELECT count(*) FROM prizes) AS total_prizes, (SELECT DISTINCT COUNT(*) FROM user_prizes WHERE user_prizes.id_gamer = id) AS user_prizes FROM gamers");

        let final_data = game_data[0]; 

        for(let i = 0; i < final_data.length; i++){
            final_data[i].completed_porcentage = calculatePlayedPorcentage(final_data[i].Ha, final_data[i].We, final_data[i].Ea, final_data[i].Me, final_data[i].Ca, final_data[i].Su, final_data[i].Eu);
        }
    
        return res.status(200).send({
            message:"successfull request",
            data:final_data,
            status: "success"  
        });
    }
}

function calculatePlayedPorcentage(ha, we, ea, me, ca, su, eu){
    /*
        Ha 8
        We 40
        Ea 16
        Me 72
        Ca 24
        Su 32
        Eu 64
    */
    
    let total_stages = 256;

    let ha_total = getCompletedStages(ha);
    let we_total = getCompletedStages(we);
    let ea_total = getCompletedStages(ea);
    let me_total = getCompletedStages(me);
    let ca_total = getCompletedStages(ca);
    let su_total = getCompletedStages(su);
    let eu_total = getCompletedStages(eu);

    let total_completed = ((ha_total + we_total + ea_total + me_total + ca_total + su_total + eu_total) * 100) / total_stages;

    return total_completed;
}

function getCompletedStages(world){
 
    let completed = 0; 
    //console.log(world);
    for(let i=0; i<world.length; i++){
        if(world[i] != 0){
            completed++;
        }
    }

    return completed; 
}