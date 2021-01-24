const passport = require("passport");
const GoogleStraegy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("./../models/user-model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStraegy({
        // options for google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log("passport callback function is fired");
        console.log("profile: ", profile);
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log("existing user is : ", currentUser);
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("new user created: ", newUser);
                    done(null, newUser);
                });
            }
        })
    })
)