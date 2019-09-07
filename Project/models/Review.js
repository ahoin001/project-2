const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Recipe Schema
const reviewSchema = new Schema({
    name: {type: String, required: true},
    recipe: {type: String, required: true},
    cuisine: {type: String, required: true},
    reviews: {type: String},
    ratings: { type: Number, min: 0, max: 5},
    datePosted: { 
      type: Date,
      default: Date.now
    }
})

const Review = mongoose.model('Review', reviewSchema);

// Export for use in other Files
module.exports = Review; 