const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')




passport.serializeUser((user, doneCallback) => {
    console.log("serializing user....")
    doneCallback(null, user.id)
})
   
passport.deserializeUser((id, doneCallback) => {
    db.user.findByPk(id)
    .then(foundUser => {
        console.log("deserializing user....")
        doneCallback(null, foundUser)
    })
    .catch((err)=>{
        console.log("error deserializing user")
    })
})

// const fieldsToCheck = {
//     usernameField: 'email',
//     passwordField: 'password'
// }

// const findAndLogInUser = (email, password, doneCallback) =>{
//     db.user.findOne({where: { email }})
//     .then((foundUser)=>{
//         if (!foundUser || !foundUser.validPassword(password)){ 
//             return doneCallback(null, false);//sends false if user not exist
//         } else {
//             return doneCallback(null, foundUser);//sends found user object
//         }
//     })
//     .catch((error)=>{
//         doneCallback(error)
//     })
// }

// const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
(email, password, doneCallback) => {
    console.log("passport-local is now trying to authenticate this user:", email)
    db.user.findOne({where:{email:email}})
    .then(async foundUser=>{
        let match 
        if(foundUser){
            match = await foundUser.validPassword(password)
        }
        if (!foundUser || !match) { 
            return doneCallback(null, false)
        } else {
            return doneCallback(null, foundUser);
        }
    })
    .catch(err=>doneCallback(err))
}))
  


module.exports = passport