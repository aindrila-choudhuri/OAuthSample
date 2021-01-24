const router = require("express").Router();
const { Strategy } = require("passport");
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
    res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
    //handle with passport
    //res.send("logging out");
    req.logOut();
    res.redirect("/");
});

// auth with google
// here we have used passport authenticate with 'google' strategy
// in app.js we just need to import the passport-setup file
// it will then call the passport.use method where google strategy object is created with required parameters 
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// google callback URI
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log("google redirect");
    //res.send("you reached the callback URI");
    //res.send(req.user);
    res.redirect("/profile/");
})

module.exports = router;