const { ifError } = require('assert')
const express = require('express')
const app = express()
const path = require('path')
const serveStatic = require('serve-static')
const port = 3000 

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

const profielen = [
    {
        "id" : "id1", 
        "name" : "Jarno Voogd", 
        "age" : "22", 
        "about" : "Hi, I'm 22 years old and I love techno. Im currently still in school studying webdevelopment. I would like to meet new people that share my love for techno.",
        "image" : "/images/imageJarno.jpg", 
        "age" : "Red Armor, Baby", 
    },
    {
        "id" : "id2", 
        "name" : "Sven Zoutman", 
        "age" : "22", 
        "about" : "I like turtles.",
        "image" : "/images/imageSven.jpeg", 
        "age" : "Both, Samantha", 
    },
    {
        "id" : "id3", 
        "name" : "Ronan Doeleman", 
        "age" : "22", 
        "about" : "Ik houd van loodgieten en koud douchen.",
        "image" : "/images/imageRonan.jpg", 
        "age" : "Fashion, Drip too hard", 
    },
    ]

// const id1 = {
//     name : "Jarno Voogd",
//     age : "22",
//     about : "Hi, I'm 22 years old and I love Techno. I'm currently still in school studying webdevelopment. I would like to meet new people that share my love for techno.",
//     image : '/images/imageJarno.jpg',
//     favSongs : "Red Armor, Baby"
    
// }

// const id2 = {
//     name : "Sven Zoutman",
//     age : "22",
//     about : "I like turtles",
//     image : '/images/imageSven.jpeg',
//     favSongs : "Both, Samantha"
// }

// const id3 = {
//     name : "Ronan Doeleman",
//     age : "22",
//     about : "Ik houd van loodgieten en koud douchen",
//     image : '/images/imageRonan.jpg',
//     favSongs : "Fashion, Drip too hard"
// } 


app.get('/myprofile/:user', (req, res) => {
    let userNameRoute = req.params.user
    let gekozenProfiel = profielen.find(profiel => profiel.id === userNameRoute)
    console.log(`dit is de pagina van ${gekozenProfiel.name} `)
    console.log(gekozenProfiel)

    res.render('pages/myprofile', {
        user : gekozenProfiel
    })

    // if (userNameRoute === "id1"){
    //     console.log("hoi jarno")
    //     res.render('pages/myprofile', {
    //         user : gekozenProfiel
    //     })
    // } else if (userNameRoute === "id2"){
    //     console.log("hoi sven")
    //     res.render('pages/myprofile' , {
    //         user: gekozenProfiel
    //     })
    // } else if (userNameRoute === "id3"){
    //     console.log("hoi ronan")
    //     res.render('pages/myprofile' , {
    //         user: id3
    //     })
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