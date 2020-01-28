const db = require('./index');
const mongoose = require('mongoose');

var reviewsSchema = new mongoose.Schema({
  productID: Number,
  reviews: [{
    username: String,
    title: String,
    stars: Number,
    date: Date,
    reviewText: String,
    recommended: Boolean,
    helpful: {
      yes: Number,
      no: Number
    }
  }]
});

var Reviews = mongoose.model('Reviews', reviewsSchema);

// Grocery.create({
//     name: "Bread",
//     quantity: 2
// });

module.exports = Reviews;
