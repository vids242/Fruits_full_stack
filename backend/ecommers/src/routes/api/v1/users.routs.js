const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");
const exportpdfmake = require("../../../utils/pdfmake");
const { sendOTP, verifyOTP } = require("../../../utils/twilio");
const sendMail = require("../../../utils/nodemailer");
const upload = require("../../../middelware/upload");
const { createToken } = require("../../../controller/users.controller");


const routes = express.Router();


routes.post('/ragister',
    // upload.single('avtar'),
    usersController.ragister
)

routes.post('/ragisterOTP',
    sendOTP,
    usersController.ragisterOTP
)

routes.get('/verifyOTP',
    verifyOTP,
    usersController.verifyOTP
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

routes.get(
    '/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        // res.redirect('/');
        console.log("login sucessfully");
        console.log(req.isAuthenticated());
        console.log("session", req.session);
        console.log("user-data", req.user);
        // Successful authentication, redirect home.

        if (req.isAuthenticated()) {
            const { accessToken, refreshToken } = await createToken(req.user._id)
            // console.log({ accessToken, refreshToken });
            const optionAcc = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000
            }

            const optionRef = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 10 * 1000
            }

            res.status(200)
                .cookie("accessToken", accessToken, optionAcc)
                .cookie("refreshToken", refreshToken, optionRef)
                .redirect("http://localhost:3000/")
        }
    });

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

routes.get('/mail',
    sendMail
)

routes.post('/pdf',
    exportpdfmake
)

routes.get('/checkAuth',
    usersController.checkAuth
)
module.exports = routes;