// routes/authorization-routes.js
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/User");

// Passport keeps track of logged in User, we access infor with req.user
router.get("/user-page", ensureLogin.ensureLoggedIn(), (req, res) => {

  res.render("user-views/user-page", { theUser: req.user });

});

router.get("/user-page/:id/edit", ensureLogin.ensureLoggedIn(), (req, res) => {

  res.render("user-views/user-edit", { theUser: req.user });

});

router.post("/user/:id/update", ensureLogin.ensureLoggedIn('/'), (req, res) => {

  // Find user in DB using current user ID , and update the username to what is in the form
  User
  // TODO :Can add whatever else user should be able to update here
    .findByIdAndUpdate(req.params.id, { username: req.body.username })
    .then(() => {
      res.redirect('/user-page');
    })
    .catch((err) => {
      console.log(`Error updating document`, err);
    })

});

module.exports = router;