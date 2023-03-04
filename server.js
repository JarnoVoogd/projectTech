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

app.get('/myprofile', (req, res) => {
    res.render('pages/myprofile')
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