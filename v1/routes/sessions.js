const sessions_controller = require('../../v1/controllers/sessions');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/save_session')
		.post(validateToken, sessions_controller.save_session);
        
    router.route('/total_played_user')
		.post(validateToken, sessions_controller.total_played_user);

    router.route('/total_played_general')
		.get(validateToken, sessions_controller.total_played_general);

    router.route('/list_sessions_user')
		.post(validateToken, sessions_controller.list_sessions_user);

    router.route('/list_sessions_general')
		.get(validateToken, sessions_controller.list_sessions_general);

	return router;    
}; 