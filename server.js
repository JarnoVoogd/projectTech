const express = require('express')
const APP = express();
APP.set('view engine', 'ejs')
APP.use(express.static('public'))


require('dotenv').config();
const PORT = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
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


// const profiles = [
//     {
//         "id" : "id1", 
//         "name" : "Jarno Voogd", 
//         "age" : "22", 
//         "about" : "Hi, I'm 22 years old and I love techno. Im currently still in school studying webdevelopment. I would like to meet new people that share my love for techno.",
//         "image" : "/images/imageJarno.jpg", 
//         "songs" : "Red Armor, Baby", 
//         "follow" : false,
//         "subId" : "id1"
//     },
//     {
//         "id" : "id2", 
//         "name" : "Sven Zoutman", 
//         "age" : "22", 
//         "about" : "I like turtles.",
//         "image" : "/images/imageSven.jpeg", 
//         "songs" : "Both, Samantha", 
//         "follow" : false,
//         "subId" : "id2"
//     },
//     {
//         "id" : "id3", 
//         "name" : "Ronan Doeleman", 
//         "age" : "22", 
//         "about" : "Ik houd van loodgieten en koud douchen.",
//         "image" : "/images/imageRonan.jpg", 
//         "songs" : "Fashion, Drip too hard", 
//         "follow" : false,
//         "subId" : "id3"
//     }    
// ]

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
    // const subId = req.params.subId;
    const profileId = req.body.profile_id;
    console.log("🚀 ~ file: server.js:112 ~ APP.post ~ profileId:", profileId)

    const followStatus = req.body.follow_status === 'true';
  
    // Update the profile's follow status in the database
    await DB.updateOne({id: profileId}, {$set: {follow: followStatus}});
  
    // Redirect the user back to the explore page
    res.redirect('/verken');
  });

  
// APP.post('/follow/:subId', (req, res) => {
//     const subId = req.params.subId;
//     console.log("🚀 ~ file: server.js:102 ~ APP.post ~ subId:", subId)
//     // Handle the follow request for the profile with the given subId
    
//     // Redirect the user back to the explore page
//     res.redirect('/verken');
// });


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

