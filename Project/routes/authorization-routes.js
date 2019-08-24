// routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");

// User model
const User = require("../models/user");

router.get("/signup", (req, res, next) => {
  res.render("authorization-views/sign-up");
});

// Make sure sign up form action posts to this url
router.post("/signup", (req, res, next) => {

  // username and password from form
  const username = req.body.username;
  const password = req.body.password;

  // bcrypting the password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.render("authorization-views/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  // Creates and inserts new user into DB
  //TODO : Do we want email / image?
  User.create({
    username,
    password: hashPass
    // email: '',
    // image: ''
  })
    .then(() => {
      // redirect user to home page
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    })
});

module.exports = router;