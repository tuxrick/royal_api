'use strict'

const express = require('express'); 
const bodyParser = require('body-parser');
require('dotenv').config();

var cors = require('cors');

const app = express();
const router = express.Router();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

let users = require('./v1/routes/users.js');
app.use('/api/v1/users', users(router));

let gamers = require('./v1/routes/gamers.js');
app.use('/api/v1/gamers', gamers(router));

//app.use(express.static('./media'));

app.listen(3000, () => {
	console.log("server running in port 3000");
});