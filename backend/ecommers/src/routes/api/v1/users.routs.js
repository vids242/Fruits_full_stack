const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");


const routes = express.Router();


routes.post('/ragister',
    usersController.ragister
)


routes.post('/login',
    usersController.login
)

routes.post('/newtoken',
    usersController.generateNewTokens
)


routes.post('/logout',
    usersController.logout
)

// routes.get(
//     '/googleLogin',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// routes.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         console.log("login sucessfully");
//         // Successful authentication, redirect home.
//         res.redirect('/');
// });

routes.get('/facebookLogin',
    passport.authenticate('facebook', { scope: ["public_profile", "email"] })
);

routes.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("login sucessfully");
        // Successful authentication, redirect home.
        res.redirect('/');
});

module.exports = routes;