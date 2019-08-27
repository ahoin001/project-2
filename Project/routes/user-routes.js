// routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");

// User model
// const User = require("../models/user");


router.get("/user/", (req, res, next) => {
  res.render("user-views/user-page");
});

// TODO : Pull Up Unique User Page Using User ID
router.get("/user/:userid", (req, res, next) => {
  res.render("authorization-views/sign-up");
});

// GET route to display the form for editing/updating the user
// router.get("/user/:theId/edit", (req, res, next) => {
//   User
//     // req.params.theId will be whatever this.id is of the User from allUsers.hbs
//     .findById(req.params.theId)
//     .then(theUser => {
     


//     })
//     .catch(err => console.log("Error while getting the User from DB: ", err));
// });

// router.post("/user/:userid/edit", (req, res, next) => {


//   res.render("user-views/edit");
// });

module.exports = router;