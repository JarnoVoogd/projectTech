/* eslint-disable no-undef */

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');


/**========================================================================
 *                           Requiring the seperate routes
 *========================================================================**/

const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URI}`;
const CLIENT = new MongoClient(
	URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, ServerApi: ServerApiVersion.v1}
);

/**========================================================================
 *                           Requiring the mongoose schemas
 *========================================================================**/

const { songs } = require('./routes/songSchema');
const { users } = require('./routes/userSchema');
const { admin } = require('./routes/adminSchema');

/**========================================================================
 *                           Defining and connecting to database
 *========================================================================**/

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URI}`;

// ******************
// - Middleware
// ******************

APP.use(express.static('public'))
APP.use(BODY_PARSER.urlencoded({ extended: false }))
APP.use(BODY_PARSER.json())


// ******************
// - Templating
// ******************

APP.set('view engine', 'ejs')


// ******************
// - Initiation database and Webserver
// ******************

CLIENT.connect()
// .then((res) => console.log('@@-- connection established', res)) 
	.catch((err) => console.log('@@-- error', err));

APP.listen (PORT, () => {
	console. log(`Server listenting to port: ${PORT}`);
});



// *********************
// -- Home page
// *********************

APP.get('/', async (req, res) => {
	const DATA = await DB.find({}).toArray();
	// console.log('@@-- data', DATA);
    
	res.render('pages/index', 
		{profiles : DATA}
	);
   
});



// *********************
// -- Explore page, view all profiles
// *********************

APP.get('/explore', async (req, res) => {
	const DATA =  await DB.find({}).toArray();
	console.log('🚀 ~ file: server.js:94 ~ APP.get ~ DATA:', DATA);
    
	res.render('pages/explore', {profiles : DATA});
	// res.render('pages/verken', { profiles : profiles});
});

//  <--- User clicks follow button ---> 
APP.post('/following/follow/:subId', async (req, res) => {
	const SUB_ID = req.params.subId;
	const FOLLOW_STATUS = req.body.followStatus === 'true';
	console.log('🚀 ~ file: server.js:150 ~ APP.post ~ req.body.followStatus:', req.body.followStatus);
    
	// Update the profile's follow status in the database
	await DB.updateOne({subId: SUB_ID}, {$set: {follow: FOLLOW_STATUS}});
  
	// Redirect the user back to the explore page
	res.redirect('/explore');
});
 


// *********************
// -- My Profile Page
// *********************
// <--- View the Admin profile --->

APP.get('/myprofile/:user', async (req, res) => {
	let USERNAME_ROUTE = req.params.user;
    
	const DATA_ADMIN = await DB_ADMIN.find({}).toArray();
	// console.log('@@-- data', DATA);
	let CHOSEN_PROFILE = DATA_ADMIN.find(profile => profile.subId === USERNAME_ROUTE);
	// console.log(`dit is de pagina van ${CHOSEN_PROFILE.name} `)
	// console.log(CHOSEN_PROFILE)
    
	res.render('pages/myprofile', {
		user : CHOSEN_PROFILE
	});
	console.log('Succesfully connected');
}
main().catch((err) => console.log(err));

/**========================================================================
 *                           Middleware
 *========================================================================**/

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**========================================================================
 *                           Templating
 *========================================================================**/

app.set('view engine', 'ejs');

/**========================================================================
 *                           Routing
 *========================================================================**/

/**----------------------
 *    Home Page
 *------------------------**/
app.get('/', async (req, res) => {
	res.send('Welkom op de homepagina');

	try {
		const allSongs = await songs.find({});
		console.log('🚀 ~ file: server.js:66 ~ app.get ~ allSongs:', allSongs);

		const allUsers = await users.find({});
		// console.log("🚀 ~ file: server.js:61 ~ app.get ~ allUsers:", allUsers)

		const allAdmins = await admin.find({});
		// console.log("🚀 ~ file: server.js:73 ~ app.get ~ allAdmins:", allAdmins)
	} catch (error) {
		console.error(error);
	}
});

app.use('/', followingRouter);

/**========================================================================
 *                           404 Error Handler
 *========================================================================**/

app.use((req, res) => {
	res
		.status(404)
		.send(
			'We`re sorry, we were not able to find the page you were looking for'
		);
});

/**========================================================================
 *                           Start Webserver
 *========================================================================**/

app.listen(port, () => {
	console.log(`Server is listening to port: ${port}`);
});
