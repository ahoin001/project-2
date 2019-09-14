// // routes/authorization-routes.js
const express = require("express");
const router = express.Router();

const Recipe = require('../models/Recipe');
const User = require('../models/User');
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");
const cloudinary = require('../config/cloudinaryconfig');

// ===================================================
//GET ROUTE to display form to create recipe
router.get('/createrecipe', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
 res.render('recipe-views/recipe-creation.hbs');
 
})

// ===================================================



// ===================================================
//POST ROUTE to create recipe
router.post('/createrecipe',cloudinary.single('recImage'), (req, res, next)=>{
//  console.log("printin",req.file);

  let newName = req.body.theName;
  let newDate = req.body.theDate;
  let newServings = req.body.theServings;
  let newType = req.body.foodType;
  let newIngredients = req.body.ingList;
  let newSteps = req.body.cookingSteps;
  let newPhoto = req.file.url;

    // Recipe.create(req.body)

    Recipe.create ({
      name: newName,
      created: newDate,
      servings: newServings,
      typeOfFood: newType,
      ingredientsList: newIngredients,
      stepsToCook: newSteps,
      recipeImage: newPhoto,
      creatorId: req.user._id
    })
    .then((result)=>{      
      // console.log("this is req.body",req.body);
      // console.log("the newly created Recipe", result);
      req.flash('success','New Recipe successfully addded to Database')

      res.redirect('all-recipes');
      //res redirect take a url as the argument


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


router.post('/reviews-updated/:id', (req, res, next) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body)
  .then(updateReviews => {
    res.render('reviews-views/reviews-updated', {updateReviews})
  })
 .catch(err => next(err));
});


// ===================================================
// POST route to save the updates on editing 
router.post("/recipes/:id/update", (req, res, next) => {
  // const { name, created, servings, typeOfFood, ingredientsList, stepsToCook, recipeImage } = req.body;
  Recipe
    // find by id and pass the new req.body to replace previous document in the DB
    //  .updateOne({_id: req.query._id}, { $set: {name, created, servings, typeOfFood, ingredientsList, stepsToCook, recipeImage }})
    .findByIdAndUpdate(req.params.id, {
      name: req.body.theName,
      created: req.body.theDate,
      servings: req.body.the
    })
    // (console.log("the data is is: ", req.params.id, "everything else is: ", req.body))
    .then((updatedRecipe)=>{
      console.log("upd", updatedRecipe)
      res.redirect(`/recipes/${updatedRecipe._id}`)
    })
    .catch(err => console.log("Error while updating the recipe: ", err));
});
     
module.exports = router;