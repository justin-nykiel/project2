const express = require('express')
const router = express.Router()

router.get('/signup', (req,res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req,res)=>{
    console.log('posting to sign up', req.body)
    res.redirect('/auth/login')
})

router.get('/login', (req,res)=>{
    res.render('auth/login.ejs')
})

router.post('/login', (req, res)=>{
    console.log('posting login', req.body)
    res.redirect('/')
})


module.exports = router