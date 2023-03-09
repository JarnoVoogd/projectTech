const express = require('express')
const app = express()
const port = 3000 
const path = require('path');
0
app.set('view engine', 'ejs')


app.use(express.static('public'))

// toegevoegd omdat ik mime errors kreeg
app.get('/public/scripts/profilesBrowser.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/scripts/profilesBrowser.js');
  });

app.get('/', (req, res) => {
    res.render('pages/index')
})

const profiles = require('./public/scripts/profilesNode.js')


app.get('/myprofile/:user', (req, res) => {
    let userNameRoute = req.params.user
    let gekozenProfiel = profiles.find(profiel => profiel.id === userNameRoute)
    console.log(`dit is de pagina van ${gekozenProfiel.name} `)
    console.log(gekozenProfiel)

    res.render('pages/myprofile', {
        user : gekozenProfiel
    })
})

app.get('/explore', (req, res) => {
    res.render('pages/explore')
})

app.listen(port, () => {
    console.log(`deze app luistert naar port ${port}`)
})