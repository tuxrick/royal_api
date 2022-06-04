//Api royal util
const api_royal = require('../../v1/api_royal.js');

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
}