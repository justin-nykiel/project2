module.exports = (req, res, next) =>{
    if(!req.user){
        req.flash('error', 'you must be logged in to view that page')
        res.redirect('/auth/login')
    } else {
        next()
    }
}