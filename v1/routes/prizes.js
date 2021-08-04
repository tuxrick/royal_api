const prizes_controller = require('../../v1/controllers/prizes');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/list_prizes')
		.get(prizes_controller.list_prizes);

    router.route('/list_user_prizes')
		.post(validateToken, prizes_controller.list_user_prizes);

    router.route('/save_user_prize')
		.post(validateToken, prizes_controller.save_user_prize);

	return router;    
}; 