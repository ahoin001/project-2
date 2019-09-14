// // routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// Review model
const Reviews = require("../models/Review");
// const Recipes = require ("../models/Recipe");

// const recId = Recipe._id;

//Get Homepage
router.get('/recipes/:id/review', (req, res, next) => {
  res.render('reviews-views/reviews', {theid: req.params.id});
});

// router.get("/recipes/{{ Recipes._id }}/review", (req, res, next) => {
//   res.render('reviews-views/reviews');
// });


//Store Data to the Data-Base
router.post('/recipes/:id/review',(req, res, next) => {
  let name      = req.body.name;
  let cuisine   = req.body.cuisine;
  let review    = req.body.review;
  let rating    = req.body.rating;   
  let recipe    = req.body.recipeId;


  Reviews.create({
    name, recipe, cuisine, review, rating
  })
  .then((result)=>{
    console.log('working', result)
    res.redirect(`/recipes/${recipe}`);
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


router.post('/reviews-updated/:id', (req, res, next) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body)
  .then(updateReviews => {
    res.render('reviews-views/reviews-updated', {updateReviews})
  })
 .catch(err => next(err));
 });

//Delete a review
router.post("/reviews-details/:theId/delete", (req, res, next) => {
  Reviews
    .findByIdAndDelete(req.params.theId)
    .then(() => res.redirect("/all-reviews"))
    .catch(err => console.log("Error while deleting the review: ", err));
});
     
module.exports = router