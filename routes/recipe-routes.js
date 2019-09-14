const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");
const cloudinary = require('../config/cloudinaryconfig');
// ===================================================
//GET ROUTE to display form to create recipe
router.get('/createrecipe', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
 res.render('recipe-views/recipe-creation.hbs', { theUser: req.user });
 
})
// ===================================================
<<<<<<< HEAD


=======
>>>>>>> db3d7e9a499af0fdecbe4c9159b5033010634b8c
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
    })
    .catch((err)=>{
      next(err)
    })
})
// ===================================================
// ===================================================
//GET ROUTE to display all the recipes
router.get('/all-recipes', (req, res, next) => {
  Recipe.find()
  .then(allRecipes => {
    // res.locals.theMsg = "You are viewing the list of Recipes!";
    res.render('recipe-views/all-recipes', {
      allRecipes,
      theUser: req.user
    });
  }).catch(err => next(err));
});
// ===================================================
// ===================================================
// GET route to display the form to show ONE recipe, clicked by name or by picture
router.get("/recipes/:recipeId", (req, res, next) => {
  Recipe
    .findById(req.params.recipeId)
    .then(theRecipe => {
      // console.log("Details page : ", theRecipe)
      res.render("recipe-views/each-recipe", { 
        theRecipe,
        theUser: req.user
      });
    })
    .catch(err => console.log("Error while getting the details of a recipe: ", err));
});
// ===================================================
// ===================================================
// POST route to delete the recipe
// action="/books/{{this._id}}/delete"
router.post("/recipes/:theId/delete", (req, res, next) => {
  Recipe
    .findByIdAndDelete(req.params.theId)
    .then(() => res.redirect("/all-recipes"))
    .catch(err => console.log("Error while deleting the book: ", err));
});
// ===================================================
// ===================================================
// GET route to display the form to edit a recipe
router.get("/recipes/:theId/edit", (req, res, next) => {
  Recipe
    .findById(req.params.theId)
    .then( oneRecipe => {
          res.render("recipe-views/edit-recipes", {
            
            oneRecipe,
            theUser: req.user

          });
    })
    .catch(err => console.log("Error while getting the book from DB: ", err));
}); 
// ===================================================
// ===================================================
// POST route to save the updates on editing 
router.post("/recipes/:id/update", (req, res, next) => {
  Recipe
    // find by id and pass the new req.body to replace previous document in the DB
    .findByIdAndUpdate(req.params.id, {
      name: req.body.theName,
      created: req.body.theDate,
      servings: req.body.theServings,
      typeOfFood: req.body.foodType,
      ingredientsList: req.body.ingList,
      stepsToCook: req.body.cookingSteps,
      recipeImage: req.body.recImage
    })
    // (console.log("the data is is: ", req.params.id, "everything else is: ", req.body))
    .then((updatedRecipe)=>{
      // console.log("upd", updatedRecipe)
      res.redirect(`/recipes/${updatedRecipe._id}`)
    })
    .catch(err => console.log("Error while updating the recipe: ", err));
});
// ===================================================
module.exports = router;