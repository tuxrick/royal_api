const controller = require('../../v1/controllers/users');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/add')
		.post(controller.add);

	router.route('/login')
	    .post(controller.login);

	router.route('/list')
		.get(validateToken, controller.list_users); 	    

	router.route('/info/:id')
		.get(validateToken, controller.info);	

	router.route('/update/:id')
		.post(validateToken, controller.update);

	return router;    
}; 