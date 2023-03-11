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

