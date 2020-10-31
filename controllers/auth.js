const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/signup', (req,res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req,res)=>{
    console.log('posting to sign up', req.body)

    db.user.findOrCreate({
        where: {email:req.body.email},
        defaults: {
            password: req.body.password,
            name: req.body.name
        }
    })
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('just created user', createdUser)
        } esle {
            console.log('already exists')
        }
        res.redirect('/auth/login')
    })

    
})

router.get('/login', (req,res)=>{
    res.render('auth/login.ejs')
})

router.post('/login', (req, res)=>{
    console.log('posting login', req.body)
    res.redirect('/')
})


module.exports = router