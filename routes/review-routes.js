// // routes/authorization-routes.js
const express = require("express");
const router = express.Router();

// Review model
const Reviews = require("../models/Review");

router.get('/reviews', (req, res, next) => {
  res.render('reviews');
});

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
    req.flash('Your review has been posted!')

    res.redirect('/')
  })
  .catch((err)=>{
    next(err)
  })

  
});

module.exports = router;

//router.get('/authors/add', (req, res, next) => {
//   res.render("author-add")
// });

// router.post('/authors/add', (req, res, next) => {
//   const { name, lastName, nationality, birthday, pictureUrl } = req.body;
//   const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
//   newAuthor.save()
//   .then((book) => {
//     res.redirect('/books')
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// });