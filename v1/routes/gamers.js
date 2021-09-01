const gamer_controller = require('../../v1/controllers/gamers');
const validateToken = require('../../v1/utils').validateToken;


module.exports = (router) => {

	router.route('/gamer_info/:owner_id')
		.get(gamer_controller.info);

	router.route('/send_confirmation_code/:owner_id')
		.get(gamer_controller.send_confirmation_code);
		
	router.route('/confirm_code/:owner_id')
		.post(gamer_controller.confirm_code);		

	router.route('/list_gamers')
		.get(validateToken, gamer_controller.list_gamers);		

	router.route('/update_gamer/:owner_id')
		.post(gamer_controller.update_gamer);

	router.route('/save_survey/:owner_id')
		.post(gamer_controller.save_survey);

	router.route('/send_campaign_mail/:campaign')
		.get(validateToken,gamer_controller.send_campaign_mail);		

	router.route('/set_skin')
		.post(validateToken,gamer_controller.set_skin);		

	router.route('/unlock_skin')
		.post(validateToken,gamer_controller.unlock_skin);
		
	router.route('/list_user_skins')
		.get(validateToken,gamer_controller.list_user_skins);		
	return router;    
};  