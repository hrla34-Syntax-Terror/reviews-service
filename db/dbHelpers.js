const Reviews = require('./model');

const helpers = {
    get: () =>  Reviews.find({}) ,
    post: (item) =>  Reviews.create(item), // have item come in as object w proper ids
    update: (_id, item) => Reviews.findByIdAndUpdate(_id, item) ,
    delete: (_id) => Reviews.findByIdAndDelete(_id) 
}

module.exports = helpers;