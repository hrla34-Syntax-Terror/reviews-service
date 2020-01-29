const Reviews = require('./model');

const helpers = {
  getAll: () => Reviews.find({}),
  getOne: (productID) => Reviews.find(productID),
  // have item come in as object w proper product ids
  post: (item) =>  Reviews.create(item), 
  addReview: (productID, item) => {
    // Reviews.find({ productID })
    //   .then(product => {
    //     var reviews = product.reviews;
    //     reviews.push(item);
    //     return Reviews.findOneAndUpdate({ productID }, reviews)
    //   })
  },
  addHelpful: (productID, body) => {
    // Reviews.find(productID)
    //   .then(product => {
    //     var currentProduct = product[0];
    //     var currIdx = currentProduct.reviews.findIndex(review => review._id.toString() === body._id);
    //     currentProduct.reviews[currIdx].helpful = body.helpful;
    //     return Reviews.findOneAndUpdate(productID, currentProduct)
    //   })
    //   .catch(err => console.error(err));
  },
  delete: (_id) => Reviews.findByIdAndDelete(_id)
}

module.exports = helpers;