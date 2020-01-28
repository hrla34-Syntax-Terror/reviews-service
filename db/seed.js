const faker = require('faker/index');
const Reviews = require('./model');

for (var i = 0; i < 100; i++) {

  var numReviews = faker.random.number(10);
  console.log(numReviews);

  var reviews = [];

  for (var j = 0; j < numReviews; j++) {
    var review = {
      username: faker.internet.userName(),
      title: faker.lorem.words(Math.floor(Math.random() * 3) + 1),
      stars: faker.random.number(5),
      date: faker.date.past(3),
      reviewText: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
      recommended: faker.random.boolean(),
      helpful: {
        yes: faker.random.number({ min: 0, max: 20 }),
        no: faker.random.number({ min: 0, max: 20 })
      }
    }
    reviews.push(review);
  }

  let product = {
    productID: i,
    reviews: reviews
  }

  Reviews.create(product);
}