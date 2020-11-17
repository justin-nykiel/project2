const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const methodOverride = require('method-override')




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
                imdbrating: req.body.imdbrating || 0,
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
            //only grab unreviewed shows to display on watch list
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
router.get('/review/:showId', (req,res)=>{
    db.show.findOne({
        where: {
            id: req.params.showId
        }
    })
    .then(show =>{
        console.log(show)
        res.render('./watchlist/newReview', {showToBeReviewed: show})
    })
    
})

//path when review is written
router.post('/reviews/new', isLoggedIn, (req,res)=>{
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
                bingeworthy: req.body.bingeWorthy || false,
                review: req.body.review,
                showId: show.id
            })
            .then(dog=>{
                res.redirect('/watchlist/reviews')
            })
        })
        
    })

})

//path to view all reviews
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
           res.render('./watchlist/reviews', {review})
        })
        
    })
    
})

//gets the edit review page
router.get('/review/edit/:id', isLoggedIn, (req,res)=>{
    
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        db.show.findOne({
            include: [db.review],
            where: {
                title: req.query.title
            }
        })
        .then(show=>{
            
           res.render('./watchlist/editReview', {show })
        })
        
    })
    
})
//update route
router.put('/review/:reviewId', (req,res)=>{
    
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
            db.review.update({
                rating: req.body.rating,
                bingeworthy: req.body.bingeWorthy || false,
                review: req.body.review
            },{
                where: {
                    showId: show.id,
                    userId: user.id
                }
            })
            .then(review=>{
                res.redirect('/watchlist/reviews')
            })
        })
        
    })
})

router.delete('/review/:reviewId', (req,res)=>{
    db.review.destroy({
        where: {
            id: req.params.reviewId
        }
    })
    .then(review=>{
        res.redirect('/watchlist/reviews')
    })
})

router.delete('/:showId', (req,res)=>{
    db.user.findOne({
        where: {id: req.user.dataValues.id}
    })
    .then((user)=>{
        db.show.findOne({
            where: {
                id: req.params.showId
            }
        })
        .then(show=>{
            db.UserShow.destroy({
                where: {
                    userId: user.id,
                    showId: show.id
                }
            })
            .then((destroyed)=>{
                res.redirect('/watchlist')
            })
        })
    })
})

module.exports = router