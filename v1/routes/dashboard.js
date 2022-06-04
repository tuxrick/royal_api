const controller = require('../../v1/controllers/dashboard');
//const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {
    router.route('/servicecenters')
		.get(controller.servicecenters);        

    router.route('/sitelist')
		.get(controller.sitelist);
    
    router.route('/membershiplevels')
		.get(controller.membershiplevels);
        
    router.route('/salestype')
		.get(controller.salestype);    

    router.route('/stewards')
		.get(controller.stewards); 

    router.route('/reasons2win')
		.get(controller.reasons2win);
        
    router.route('/Maindashboard')
		.post(controller.Maindashboard);

    router.route('/dashboardgeneralinfo')
		.post(controller.dashboardgeneralinfo);

    router.route('/dashboardsalesinfo')
		.post(controller.dashboardsalesinfo);

    router.route('/PrizesWonPerSite')
		.post(controller.PrizesWonPerSite);  


return router;    

}
