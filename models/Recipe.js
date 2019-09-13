const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now},
    servings: {type: String, required: true},
    typeOfFood: {type: String, enum: ["Italian", "Chinese", "American"]}, //just an example of the options, we can decide later
    ingredientsList: [],
    stepsToCook: {type: String, required: true},
    recipeImage: {type: String, required: true},
    creatorId: [{type: Schema.Types.ObjectId, ref: 'User'}]
})


const Recipe = mongoose.model('Recipe', recipeSchema);

// Export for use in other Files
module.exports = Recipe;
