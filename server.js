const express = require('express');
const APP = express();
const BODY_PARSER = require('body-parser');


APP.set('view engine', 'ejs');
APP.use(express.static('public'));
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

require('dotenv').config();


// *********************
// -- Database and server port config
// *********************

const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URI}`;
const CLIENT = new MongoClient(
	URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, ServerApi: ServerApiVersion.v1}
);


// ******************
// - Database Collections
// ******************

const DB = CLIENT.db(process.env.DB_NAME).collection(process.env.COLLECTION_PROFILES_NAME)
const DB_ADMIN = CLIENT.db(process.env.DB_NAME).collection(process.env.COLLECTION_ADMIN_NAME)
const DB_GENERAL = CLIENT.db(process.env.DB_NAME).collection(process.env.COLLECTION_GENERAL_NAME)


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
});


// ******************
// - Following page
// ******************
// <--- View the profiles Admin is currently following --->

APP.get('/following', async (req, res) => {
	const DATA_FOLLOWING = await DB.find({follow : true}).toArray();
	const EMPTY_MESSAGE_IMAGE_PULL = await DB_GENERAL.find({}).toArray();
	const EMPTY_MESSAGE_IMAGE = EMPTY_MESSAGE_IMAGE_PULL.find(profile => profile.imageEmpty);
	if (DATA_FOLLOWING.length < 1) {
		res.render('pages/following', {
			FOLLOWING_ARRAY : DATA_FOLLOWING,
			EMPTY_MESSAGE_H2 : 'You don\'t seem to be following anyone...',
			EMPTY_IMAGE : EMPTY_MESSAGE_IMAGE.imageEmpty,
			EMPTY_MESSAGE_P : 'Head on over to the explore page to find new people to follow!'

		});
	} else {
		res.render('pages/following', {
			FOLLOWING_ARRAY : DATA_FOLLOWING,
			EMPTY_MESSAGE_H2 : '',
			EMPTY_IMAGE : '',
			EMPTY_MESSAGE_P : ''
		});
	}
});

//  <--- User clicks the unfollow button --->
APP.post('/following/:subId', async (req, res) => {
	const SUB_ID = req.params.subId;
	const FOLLOW_STATUS = req.body.followStatus === 'true';
    
	// Update the profile's follow status in the database
	await DB.updateOne({subId: SUB_ID}, {$set: {follow: FOLLOW_STATUS}});
  
	// Redirect the user back to the explore page
	res.redirect('/following');
});





// *********************
// -- 404 Handler
// *********************

APP.use((req, res) => {
	res.status(404).send('We\'re sorry, we were not able to find the page you were looking for');
});
