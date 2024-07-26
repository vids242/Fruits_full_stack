const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const Users = require('../models/users.models');

const GoogleProvider = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: '507400777787-53alp5m1il62dc649kbd2sorjgs6k6lk.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:8000/api/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log(profile);

                try {
                    let user = await Users.findOne({ googleId: profile.id })

                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: 'user'
                        })
                    }
                    console.log("user data",user);
                    return cb(null, user);
                } catch (error) {
                    return cb(error, null);
                }
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("seriallize");
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            await Users.findById(id, function (err, user) {
                console.log("deserializeUserok");
                done(err, user);
            });
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = GoogleProvider


