'use strict'

const express = require('express'); 
const bodyParser = require('body-parser');

var cors = require('cors');

const app = express();
const router = express.Router();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


const users = require('./v1/routes/users.js');

app.use('/api/v1/users', users(router));

//app.use(express.static('./media'));

app.listen(3000, () => {
	console.log("server running in port 3000");
});