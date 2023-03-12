const express = require('express')
const APP = express();
const BODY_PARSER = require('body-parser');
APP.set('view engine', 'ejs')
APP.use(express.static('public'))
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());


require('dotenv').config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
// eslint-disable-next-line no-undef
const URI = process.env.DB_CONNECTION_STRING;

const CLIENT = new MongoClient(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true, ServerApi: ServerApiVersion.v1}
)

CLIENT.connect()
    // .then((res) => console.log('@@-- connection established', res)) 
    .catch((err) => console.log('@@-- error', err))

APP.listen (PORT, () => {
console. log(`Server listenting to port: ${PORT}`)

const DB = CLIENT.db('bloktech').collection('profiles_bloktech');
APP.get('/', async (req, res) => {
    const DATA = await DB.find({}).toArray();
    // console.log('@@-- data', DATA);
    
    res.render('pages/index', 
        {profiles : DATA})

    // res.json({
    //     succes: true, 
    //     message: 'connected',
    //     // DATA
    // })
    
})



// const DATA =  DB.find({}).toArray();

// const DATA =  profiles;
// const SCHONE_DATA = profiles.find(profiel => profiel.id)
// console.log( DATA);
// console.log(SCHONE_DATA)

// DATA.forEach((profile) => {
//     console.log(profile)
// })

// let html = '';

// for (let i = 0; i < DATA.length; i++) {
//     html += `<div>${DATA[i]}</div>`;
//   }

APP.get('/verken', async (req, res) => {
    const DATA =  await DB.find({}).toArray();
    console.log("🚀 ~ file: server.js:94 ~ APP.get ~ DATA:", DATA)
    
    res.render('pages/verken', {profiles : DATA});
    // res.render('pages/verken', { profiles : profiles});
})


APP.post('/follow/:subId', async (req, res) => {
    const subId = req.params.subId;
    const followStatus = req.body.followStatus === 'true';
    console.log("🚀 ~ file: server.js:150 ~ APP.post ~ req.body.followStatus:", req.body.followStatus)
    
    // Update the profile's follow status in the database
    await DB.updateOne({subId: subId}, {$set: {follow: followStatus}});
  
    // Redirect the user back to the explore page
    res.redirect('/verken');
  });
  



APP.get('/myprofile/:user', async (req, res) => {
    let userNameRoute = req.params.user
    const DATA = await DB.find({}).toArray();
    console.log('@@-- data', DATA);
    let gekozenProfiel = DATA.find(profiel => profiel.id === userNameRoute)
    console.log(`dit is de pagina van ${gekozenProfiel.name} `)
    console.log(gekozenProfiel)

    res.render('pages/myprofile', {
        user : gekozenProfiel
    })
})

// APP.get('/explore', (req, res) => {
//     res.render('pages/explore')
// })

APP.get('/explore',  async (req, res) => {
    const DATA = await DB.find({}).toArray();
    // console.log('@@-- data', DATA);
    
    res.render('pages/explore', 
        {profiles : DATA})

    // res.json({
    //     succes: true, 
    //     message: 'connected',
    //     // DATA
    // })
    
})

})
