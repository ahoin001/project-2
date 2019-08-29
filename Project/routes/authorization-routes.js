// routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// For routes that require login to be accessed we need this package
const ensureLogin = require("connect-ensure-login");

// Passport
const passport = require("passport");

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");

// cloudinary
const cloudinary = require('../config/cloudinaryconfig');

// User model
const User = require("../models/User");

// ********************************************************************************

// document.getElementById("form").addEventListener("submit", function(event){
//   event.preventDefault()
// });

router.get("/signup", (req, res, next) => {
  res.render("authorization-views/sign-up");
});

router.post("/signup", cloudinary.single('image'), (req, res, next) => {
 
  console.log(`========================================`);
  console.log(req.body);

  console.log(`////////////////////////////////////////`);
  console.log(`The req file`);
  console.log(req.file);
  // Information from form
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  // Give profile image a default image
  let profileImage = '/Project/public/images/ppic.png';

  // if user provided a image to use, use thiers
  if(req.file){
    profileImage =  req.file.url;
  }

  // bcrypting the password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  // TODO: Validation error message needs to be presented properly
  if (username === "" || password === "") {
    res.render("authorization-views/signup", {
      errorMessage: "Username and password can not be blank for sign up"
    });
    return;
  }

  // Creates and inserts new User into DB
  //TODO : Do we want email / image?
  User.create({
    username,
    password: hashPass,
    // email: '',
    profilepic: profileImage
  })
    .then(() => {
      // redirect user to login page after successful account creation
      console.log(User);
      res.redirect("/login");
    })
    .catch(error => {
      // error on failed sign up
      console.log(error);
      console.log(`Error creating/inserting user`)
    })

});

router.get("/login", (req, res, next) => {
  res.render("authorization-views/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {

  successRedirect: "/user-page",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true

}));

// Passport provides a logout function to req
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// TODO : Add the ensureLogin method (need to install ensure login pkg) to routes that only a user should have access too
router.get("/success", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("success");
  // console.log(`Logged In!!`);
});


module.exports = router;