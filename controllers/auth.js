const express = require('express')
const router = express.Router()

router.get('/signup', (req,res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req,res)=>{
    console.log('posting to sign up')
    res.redirect('/auth/login')
})

router.get('/login', (req,res)=>{
    res.send("loginnnnn")
})

router.post('/login', (req, res)=>{
    console.log('posting login')
    res.redirect('/')
})


module.exports = router