// routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");

// User model
const User = require("../models/user");

router.get("/signup", (req, res, next) => {
  res.render("authorization/signup");
});

// Make sure sign up form action posts to this url
router.post("/signup", (req, res, next) => {

  // username and password from form
  const username = req.body.username;
  const password = req.body.password;

  // bcrypting the password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass
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