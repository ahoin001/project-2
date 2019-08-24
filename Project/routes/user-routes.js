// routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");

// User model
const User = require("../models/user");

// TODO : Pull Up Unique User Page Using User ID
router.get("/user/:userid", (req, res, next) => {
  res.render("authorization-views/sign-up");
});


module.exports = router;