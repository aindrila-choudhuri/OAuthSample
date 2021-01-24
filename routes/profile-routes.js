const { route } = require("./auth-routes");

const router = require("express").Router();

const authCheck = (req, res, next) => {
    console.log("req.user", req.user)
    if (!req.user) {
        res.redirect("/auth/login");
    } else{
        next();
    }
}

router.get("/", authCheck, (req, res) => {
    message = "You are now logged in : " + req.user.username
    res.status(200).send(message);
});

module.exports = router;