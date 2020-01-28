const Reviews = require('./model');

const helpers = {
    getAll: () =>  Reviews.find({}) ,
    getOne: (productID) => Reviews.find({productID}),
    // post: (item) =>  Reviews.create(item), // have item come in as object w proper ids
    addReview: (productID, item) => {
      Reviews.find({productID})
        .then(product => {
          var reviews = product.reviews;
          reviews.push(item);
          return Reviews.findOneAndUpdate({productID}, reviews)
        })
    },
    addHelpful: (productID, _id, item) => {
      Reviews.find({productID})
        .then(product => {
          var reviews = product.reviews;
          var curIdx = reviews.findIndex((review) => review._id === _id);
          var currentReview = reviews[curIdx];
          currentReview.helpful[item] = currentReview.helpful[item] + 1;
          reviews[curIdx] = currentReview;
          return Reviews.findOneAndUpdate({productID}, reviews)
        })
    },
    delete: (_id) => Reviews.findByIdAndDelete(_id) 
}

module.exports = helpers;