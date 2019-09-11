const express = require('express');
const router  = express.Router();

const Recipe = require('../models/Recipe');

/* GET home page */
router.get('/', (req, res, next) => {  
    Recipe.find()
    .then((result)=>{
      // console.log(result)
  
      let newList = result.map((eachCeleb)=>{
        if(eachCeleb.creator.equals(req.user._id)){
          eachCeleb.owned = true;
          return eachCeleb
        } else{
          return eachCeleb;
        }
  
      })
  
  
  
      res.render('celeb-views/list-of-celebs', {listOfCelebs: newList});
    })
    .catch((err)=>{
      next(err);
    })
  });