const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require(__dirname+'/config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(ejsLayouts)


//body parser
app.use(express.urlencoded({extended:false}))

//session middelware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//flash middleware
app.use(flash())

//custom middleware
app.use((req, res, next)=>{
    //before every route it as attaching the flas mesage as well as the user data to res.locals
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user

    next() //moves along to next piece of middleware
})


app.use('/auth', require('./controllers/auth'))

app.get('/', (req, res)=>{
    res.render('home')
})
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.listen(process.env.PORT)