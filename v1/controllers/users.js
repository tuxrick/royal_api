//Libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const base64url = require('base64url'); 
const Sequelize = require('sequelize');

const http = require('http');
const db = require('../../database/db.js');

//Models
const User = require('../../v1/models/users');


module.exports = {
	
	add: (req, res) => {
	
	    //Data to save the user		        
	    const user_info = {
	        email: req.body.email,
	        name: req.body.name,
			id_role: 2,//Single user as default
	    };
	    
	    User.findOne({
	        where: {
	          email: user_info.email
	        }
	    }).then(user => {
	        if (!user) {
		        		        
		        //Encrypting password
	            bcrypt.hash(req.body.password, 10, (err, hash) => {
					//Encrypted password
	                user_info.password = hash;
					
	                User.create(user_info).then(created_user => {
	
	                    return res.status(200).send({
	                        data: created_user,
	                        message:"User successfully saved",
	                        status: "success"  
	                    });
		                    		                    
	                }).catch(err => {
		                
	                    return res.status(401).send({
	                        error: err,
	                        message:"Error saving user",
	                        status: "error"
	                    });
	                    
	                });
	
			                	
	            });
	        } else {
	            res.status(401).send({
	                message:"User already registered",
	                status: "error" 
	            });
	        }
	    }).catch(err => {
	        res.status(401).json({ 
		        data: err,
		        status: "error"
		    })
	    });
	
	},

	login: (req, res) => {
		
		const { email, password } = req.body;
	
	    User.findOne({
	        where: {
	            email: email
	        }
	    }).then(user => {
	        if (user) {
								
				if (bcrypt.compareSync(password, user.password)) {
					
					let token = jwt.sign({
									id:user.id, 
									email:user.email, 
									user:user.name,
									id_role:user.id_role, 
								}, 
								process.env.SECRET_KEY, {
									expiresIn: '90d'
								}
							);
					
					return res.status(200).send({
						data:{
							id: user.id,
							token:token,
							email: user.email
						},
						message:"User logged in",
						status: "success" 
					}); 
	
				} else {
					return res.status(401).send({
						message:"Wrong password",
						status: "error" 
					});
				}                
	
	        } else {
	            return res.status(401).send({
				    message:"User not found",
				    status: "error" 
			    });
	        }
	        
	    }).catch(err => {
	        res.status(401).json({ 
		        data: err,
		        status: "error"
		    })
	    });
	
	},

	list_users: (req, res) => {
	    
		//user decoded information
	    const user_info = req.decoded;
	    
	    if (user_info && user_info.id_role == 1) {
		    
		    User.findAll()
		    .then(users => {
	
	            res.status(200).json({ 
	                data: users,
	                message:"Successfull request",
	                status: "success"
	            });		    
	            
		    })
		    .catch(function (err) {
	            res.status(401).json({ 
	                data: err,
	                message:"Error listing users",
	                status: "error"
	            });
	        });		    
	    }else{
		    
	        res.status(401).json({ 
	            message:"The user doesn't have permissions to see this ",
	            status: "error"
	        });		    
		    
	    }

	},		

	info: (req, res) => {
	    
		const user_info = req.decoded;	    
	    const get_user_id = req.params.id;	    

		
	    //This info will be only displayed for admins and user owners
	    if ( (user_info && user_info.id_role == 1) || (user_info.id == get_user_id) ) {
	    	    
		    User.findOne({
				where:{
					id: get_user_id
				},
				attributes: ['id', 'email', 'name', 'id_role'], 		    
		    })
		    .then(response => {
	
	            res.status(200).json({ 
	                data: response,
	                message:"Successfull request",
	                status: "success"
	            });		    
	            
		    })
		    .catch(function (err) {
	            res.status(401).json({ 
	                data: err,
	                message:"Error listing users",
	                status: "error"
	            });
	        });		    
		}else{
		    
	        res.status(401).json({ 
	            message:"You don't have permissions to do this",
	            status: "error"
	        });		    
		    
	    }

	},

	update: (req, res) => {
	    
		const user_info = req.decoded;
	    const get_user_id = req.body.id;	    

	    const user_got_info = {
	        email: req.body.email,
	        name: req.body.name,
	    };

		
		let updated_user = user_info.id;

		if(req.body.id){
			updated_user = req.body.id;
		}

	    //This info will be updated by admins and user owners
	    if ( (user_info && user_info.id_role == 1) || (user_info.id == get_user_id) ) {
	    	    
			if(user_info && user_info.id_role == 1){
				user_got_info.id_role = req.body.id_role;
			}	    	    
	    	    
		    User.update(
		    	user_got_info,
		    	{
					where:{
						id: updated_user
					}
				}
		    ).then(response => {
	
	            res.status(200).json({ 
	                data: response,
	                message:"Successfull request",
	                status: "success"
	            });		    
	            
		    }).catch(function (err) {
	            res.status(401).json({ 
	                data: err,
	                message:"Error updating user",
	                status: "error"
	            });
	        });		    
		}else{
		    
	        res.status(401).json({ 
	            message:"You don't have permissions to do this",
	            status: "error"
	        });		    
		    
	    }

	}

}
