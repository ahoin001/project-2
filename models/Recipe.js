// TODO : Recipe Schema (Delete this comment when completed?)
// 1. Anything else needed?

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    name: String,
    date: { type: Date, default: Date.now },
    servings: Number,
    typeOfFood: {type: String, enum: ["Italian", "Chinese", "American"]}, //just an example of the options, we can decide later
    ingredientsList: {},
    stepsToCook: String,
    recipeImage: String, //REQUIRED FIELD
    creatorId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

// name: String
// date: Date
// servings: Number
// typeOfFood: StringEnum - this gives the user an array of choices
// ingredientsList: array of objects (total too)
// stepsToCook: String
// creatorId: id

const Recipe = mongoose.model('Recipe', recipeSchema);

// Export for use in other Files
module.exports = Recipe;
