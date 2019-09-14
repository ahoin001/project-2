// // routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// Review model
const Reviews = require("../models/Review");

//Get Homepage
router.get('/reviews', (req, res, next) => {
  res.render('reviews-views/reviews');
});


//Store Data to the Data-Base
router.post('/reviews/create',(req, res, next) => {
  let name      = req.body.name;
  let recipe    = req.body.recipe;
  let cuisine   = req.body.cuisine;
  let review    = req.body.review;
  let rating    = req.body.rating;   


  Reviews.create({
    name, recipe, cuisine, review, rating
  })
  .then((result)=>{
    console.log('working', result)
    res.redirect('/all-reviews');
  })
  .catch((err)=>{
    next(err)
  })
});


//redirecting to hbs & display reviews
router.get('/all-reviews', (req, res, next) => {
  Reviews.find()
  .then(allReviews => {
    res.render('reviews-views/all-reviews', {allReviews});
  }).catch(err => next(err));
});


//edit and update a review
router.get('/reviews-details/:id', (req, res, next) => {
  Reviews.findById(req.params.id)
  .then(detailReviews => {
    res.render('reviews-views/reviews-details', {detailReviews});
  }).catch(err => next(err));
});


router.post("/reviews-updated/:theId", (req, res, next) => {
  Reviews.
  findByIdAndUpdate(req.params.theId, req.body)
  .then(detailReviews => {res.render('reviews-views/reviews-updated', {detailReviews});
}).catch(err => console.log("Error while updating the review:", err));
});

//Delete a review
router.post("/reviews-details/:theId/delete", (req, res, next) => {
  Reviews
    .findByIdAndDelete(req.params.theId)
    .then(() => res.redirect("/all-reviews"))
    .catch(err => console.log("Error while deleting the review: ", err));
});
     
module.exports = router