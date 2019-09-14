const express = require('express');
const router  = express.Router();

const Recipe = require('../models/Recipe');

//REQUIRE ENSURE PASSPORT
//REQUIRE ENSURE LOGIN

// TODO : Add the ensureLogin method to routes that only a logged in user should have access too
// router.get("/success", ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   res.render("success");
//   // console.log(`Logged In!!`);
// });



// ===================================================
//GET ROUTE to display form to create recipe
router.get('/createrecipe', (req, res, next)=>{
  res.render('recipe-views/recipe-creation.hbs');
  //res render take a relative path as the argument
})

// ===================================================



// ===================================================
//POST ROUTE to create recipe
router.post('/createrecipe', (req, res, next)=>{
  let newName = req.body.theName;
  let newDate = req.body.theDate;
  let newServings = req.body.theServings;
  let newType = req.body.foodType;
  let newIngredients = req.body.ingList;
  let newSteps = req.body.cookingSteps;
  let newPhoto = req.body.recImage;

    // Recipe.create(req.body)

    Recipe.create ({
      name: newName,
      occupation: newDate,
      servings: newServings,
      typeOfFood: newType,
      ingredientsList: newIngredients,
      stepsToCook: newSteps,
      recipeImage: newPhoto,
      // creatorId: req.user._id
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
    res.render('recipe-views/all-recipes', {allRecipes});
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
      res.render("recipe-views/each-recipe", { theRecipe });
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
          res.render("recipe-views/edit-recipes", {oneRecipe});
    })
    .catch(err => console.log("Error while getting the book from DB: ", err));
}); 
// ===================================================



// ===================================================
// POST route to save the updates on editing 
router.post("/recipes/:id/update", (req, res, next) => {
  // const { name, created, servings, typeOfFood, ingredientsList, stepsToCook, recipeImage } = req.body;
  Recipe
    // find by id and pass the new req.body to replace previous document in the DB
    //  .updateOne({_id: req.query._id}, { $set: {name, created, servings, typeOfFood, ingredientsList, stepsToCook, recipeImage }})
    .findByIdAndUpdate(req.params.id, req.body)
    // .then(console.log("the data is is: ", req.params.id, "everything else is: ", req.body))
    .then(updatedRecipe => res.redirect(`/recipes/${updatedRecipe._id}`))
    // .then(()=>{
    //   res.redirect('/all-recipes');
    // })
    .catch(err => console.log("Error while updating the recipe: ", err));
});
// ===================================================


// router.post('/books/edit', (req, res, next) => {
//   const { title, author, description, rating } = req.body;
//   Book.update({_id: req.query.recipe_id}, { $set: {tname, created, servings, typeOfFood, ingredientsList, stepsToCook, recipeImage }})
//   .then((book) => {
//     res.redirect('/books');
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// });





module.exports = router;