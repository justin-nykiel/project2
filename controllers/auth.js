const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')


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
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account successfully created and logged in'
            })(req,res) //IIFE = immediately invoked function
        } else {
            req.flash('error', 'email has already been used to create an account, try logging in')
            res.redirect('/auth/login')
        }
        //res.redirect('/auth/login')
    })
    .catch((error)=>{
        console.log('OOOO noooo', error)
    })
    
})

router.get('/login', (req,res)=>{
    res.render('auth/login.ejs')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'invalid email or password'
}))

router.get('/logout', (req,res)=>{
    req.logout()
    req.flash('success', 'successfully logged out')
    res.redirect('/')
})


module.exports = router