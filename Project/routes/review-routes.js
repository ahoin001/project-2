// // routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// Review model
const Reviews = require("../models/Review");

router.get('/reviews', (req, res, next) => {
  res.render('reviews');
});

module.exports = router;
