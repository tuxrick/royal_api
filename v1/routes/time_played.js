const time_played_controller = require('../../v1/controllers/time_played');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/save_time')
		.post(validateToken, time_played_controller.save_time);

    router.route('/time_played_game_user')
		.post(validateToken, time_played_controller.time_played_game_user);

    router.route('/time_played_game/:id_game')
		.get(validateToken, time_played_controller.time_played_game);

	return router;    
}; 