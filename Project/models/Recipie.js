// TODO : Recipie Schema (Delete this comment when completed?)
// 1. Anything else needed?

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({

    writtenReview: String,
    rating: Number,

})

const Recipe = mongoose.model('Recipie', recipeSchema);

// Export for use in other Files
module.exports = Recipe;
