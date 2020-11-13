const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

//path when something is added too watched list
router.post('/new', isLoggedIn, (req,res)=>{
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
router.get('/', (req,res)=>{
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        user.getShows({
            include: [db.review]
        })
        .then((shows)=>{
            let unwatched = []
            for(show of shows){
                if(show.reviews[0] == undefined){
                    unwatched.push(show)
                }
            }
            
            res.render('./watchlist/viewList.ejs', {results: unwatched})
        })
    })
})

//shows user page where they can review a specific show
router.get('/review', (req,res)=>{
    let showToBeReviewed = {
        title: req.query.title,
        img: req.query.img,
        imdbrating: req.query.imdbrating,
        year: req.query.year,
        vtype: req.query.vtype,
        synopsis: req.query.synopsis
    }
    console.log(showToBeReviewed)
    res.render('./watchlist/newReview', {showToBeReviewed})
})

//path when review is written
router.post('/reviews/new', isLoggedIn, (req,res)=>{
    console.log(req.user.dataValues.id)
    console.log(req.body.review)
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        db.show.findOne({
            where: {
                title: req.body.title
            }
        })
        .then(show=>{
            console.log(show.id)
            user.createReview({
                rating: req.body.rating,
                bingeworthy: req.body.bingeWorthy,
                review: req.body.review,
                showId: show.id
            })
            .then(dog=>{
                res.redirect('/watchlist/reviews')
            })
        })
        
    })

})

router.get('/reviews', isLoggedIn, (req,res)=>{
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        db.review.findAll({
            include: [db.show],
            where: {
                userId: user.id
            }
        })
        .then(review=>{
           console.log(review[0].show.title)
           res.render('./watchlist/reviews', {review})
        })
        
    })
    
})

module.exports = router