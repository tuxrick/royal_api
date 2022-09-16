'use strict'

const express = require('express'); 
const bodyParser = require('body-parser');
require('dotenv').config();

var cors = require('cors');
const cors_option = {
	origin: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	exposedHeaders: ["x-auth-token"]
};


const app = express();
const router = express.Router();



//Middlewares
app.use(cors(cors_option));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

let users = require('./v1/routes/users.js');
app.use('/api/v1/users', users(router));

let gamers = require('./v1/routes/gamers.js');
app.use('/api/v1/gamers', gamers(router));

let scores = require('./v1/routes/scores.js');
app.use('/api/v1/scores', scores(router));

let time_played = require('./v1/routes/time_played.js');
app.use('/api/v1/time_played', time_played(router));

let sessions = require('./v1/routes/sessions.js');
app.use('/api/v1/sessions', sessions(router));

let prizes = require('./v1/routes/prizes.js');
app.use('/api/v1/prizes', prizes(router));

let dashboard = require('./v1/routes/dashboard.js');
app.use('/api/v1/dashboard', dashboard(router));


app.listen(3000, () => {
	console.log("server running in port 3000");
});
