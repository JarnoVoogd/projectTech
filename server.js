const express = require('express')
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))


require('dotenv').config();
const PORT = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, ServerApi: ServerApiVersion.v1}
)

client.connect()
    .then((res) => console.log('@@-- connection established', res)) 
    .catch((err) => console.log('@@-- error', err))

app.listen (PORT, () => {
console. log(`Server listenting to port: ${PORT}`)

const DB = client.db('bloktech').collection('profiles_bloktech');
app.get('/', async (req, res) => {
    const DATA = await DB.find({}).toArray();
    console.log('@@-- data', DATA);
    
    res.render('pages/index', 
        {profiles : DATA})

    // res.json({
    //     succes: true, 
    //     message: 'connected',
    //     // DATA
    // })
    
})

app.get('/myprofile/:user', async (req, res) => {
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

// app.get('/explore', (req, res) => {
//     res.render('pages/explore')
// })

app.get('/explore',  (req, res) => {
    const DATA = DB.find({}).toArray();
    console.log('@@-- data', DATA);
    
    res.render('pages/explore', 
        {profiles : DATA})

    // res.json({
    //     succes: true, 
    //     message: 'connected',
    //     // DATA
    // })
    
})

})
