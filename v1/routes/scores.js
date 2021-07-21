const scores_controller = require('../../v1/controllers/scores');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/save_score')
		.post(validateToken, scores_controller.save_score);

    router.route('/max_score_game_user')
		.post(validateToken, scores_controller.max_score_game_user);

    router.route('/max_score_game/:id_game')
		.get(validateToken, scores_controller.max_score_game);

	return router;    
}; 