const express = require('express')
const app = express()
const port = 3000 

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('<h1> Welkom bij deze matching app</h1>')
})

app.get('/about', (req, res) => {
    res.render('views\about')
})

app.listen(port, () => {
    console.log(`deze app luistert naar port ${port}`)
})