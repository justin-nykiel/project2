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


var unirest = require("unirest");

var request = unirest("GET", "https://unogsng.p.rapidapi.com/search");

const axios = require("axios").default;

app.get('/search', (req,res)=>{
   console.log(req.query.searchTerm)
    
    const options = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
        limit: '1',
        query :req.query.searchTerm,
        limit : "10",
        countrylist : "78, 46",
        orderby : "rating"
    },
    headers: {
        'x-rapidapi-key': 'b539ce6886msha8efc0821f59136p1adb65jsn88965d892229',
        'x-rapidapi-host': 'unogsng.p.rapidapi.com'
    }
    };


    axios.request(options).then(function (response) {
        let results = response.data.results;
        res.render('results', {results})
    }).catch(function (error) {
        console.error(error);
    });
    
    //path when something is added too watched list
    app.post('/watchlist/new', (req,res)=>{
        console.log(req.body.title)
    })

    //path to view the watched list
    app.get('/watchlist', (req,res)=>{
        
    })
})

app.listen(process.env.PORT)

