const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require(__dirname+'/config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')
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




const axios = require("axios").default;

app.get('/search', (req,res)=>{
   
    
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
    

})
//path when something is added too watched list
app.post('/watchlist/new', isLoggedIn, (req,res)=>{
    console.log(req.user.dataValues.id)
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        db.show.findOrCreate({
            where: {
                title: req.body.title,
                nfid: req.body.nfid,
                img: req.body.img,
                imdbrating: req.body.imdbrating,
                year: req.body.year,
                vtype: req.body.vtype,
                synopsis: req.body.synopsis
            }
        }).then(([show, created])=>{
            user.addShow(show)
            res.redirect('/watchlist')
        })
    })
})

 //path to view the watched list
 app.get('/watchlist', (req,res)=>{
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        user.getShows()
        .then((shows)=>{
            res.render('./watchlist/viewList.ejs', {results: shows})
        })
    })
})

app.listen(process.env.PORT)

