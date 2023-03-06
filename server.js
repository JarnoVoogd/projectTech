const { ifError } = require('assert')
const express = require('express')
const app = express()
const path = require('path')
const serveStatic = require('serve-static')
const port = 3000 

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    // res.send('<h1> Welkom bij deze matching app</h1>')
    res.render('pages/index')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

// app.get('/myprofile', (req, res) => {
//     res.render('pages/myprofile')
// })

const jarnovoogd = {
    name : "Jarno Voogd",
    age : "22",
    about : "Hi, I'm 22 years old and I love Techno. I'm currently still in school studying webdevelopment. I would like to meet new people that share my love for techno.",
    image : '/images/imageJarno.jpg',
    favSongs : "Red Armor, Baby"
    
}

const svenzoutman = {
    name : "Sven Zoutman",
    age : "22",
    about : "I like turtles",
    image : '/images/imageSven.jpeg',
    favSongs : "Both, Samantha"
}


app.get('/myprofile/:user', (req, res) => {
    let userNameRoute = req.params.user
    console.log(`dit is de pagina van ${req.params.user}`)

    if (userNameRoute == "jarnovoogd"){
        console.log("hoi jarno")
        res.render('pages/myprofile', {
            userName : jarnovoogd.name,
            age : jarnovoogd.age,
            about : jarnovoogd.about,
            image : jarnovoogd.image,
            songs : jarnovoogd.favSongs 
        })
    } else if (userNameRoute == "svenzoutman"){
        console.log("hoi sven")
        res.render('pages/myprofile' , {
            userName : svenzoutman.name,
            age : svenzoutman.age,
            about: svenzoutman.about,
            image : svenzoutman.image,
            songs : svenzoutman.favSongs
        })
    }
})










// app.use('/test', serveStatic(path.join('about.html', "/views")))

// app.use('/test', (req, res) => {
//     res.serveStatic(path.join('about.html', "/views"))
// })

app.get('/about', (req, res) => {
    res.sendFile(__dirname+"/views/about.html", __dirname+"/views/about.css")
    
})

app.listen(port, () => {
    console.log(`deze app luistert naar port ${port}`)
})