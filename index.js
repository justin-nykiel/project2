const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(express.urlencoded({extended:false}))
app.get('/', (req,res)=>{
    res.render('index.ejs')
})

app.use('/auth', require('./controllers/auth'))

app.listen(8000)