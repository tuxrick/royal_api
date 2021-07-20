const user_controller = require('../../v1/controllers/users');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/add')
		.post(user_controller.add);

	router.route('/login')
	    .post(user_controller.login);

	router.route('/list')
		.get(validateToken, user_controller.list_users); 	    

	router.route('/info/:id')
		.get(validateToken, user_controller.info);	

	router.route('/update/:id')
		.post(validateToken, user_controller.update);

	return router;    
}; 