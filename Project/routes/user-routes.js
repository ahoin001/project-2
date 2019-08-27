// routes/authorization-routes.js
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/User");

// Passport keeps track of logged in User, we access infor with req.user
router.get("/user-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  
  res.render("user-views/user-page",{theUser: req.user});

});

router.get("/user-page/edit", ensureLogin.ensureLoggedIn(), (req, res) => {
  
  res.render("user-views/user-edit",{theUser: req.user});

});

module.exports = router;