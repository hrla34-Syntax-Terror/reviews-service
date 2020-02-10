const faker = require('faker/index');
const Reviews = require('./model');

Reviews.remove({})
  .then(() => {console.log('old db clear, seeding new db...')})
  .then(() => {
    for (var i = 0; i < 100; i++) {

      var numReviews = faker.random.number({ min: 15, max: 50 });
    
      var reviews = [];

      var photos = [
        '../rei-photos/1.jpg', 
        '../rei-photos/2.jpg', 
        '../rei-photos/3.jpg', 
        '../rei-photos/4.jpg', 
        '../rei-photos/5.jpg', 
        '../rei-photos/6.jpg' 
      ]
    
      for (var j = 0; j < numReviews; j++) {
        var review = {
          username: faker.internet.userName(),
          title: faker.company.catchPhrase(),
          stars: faker.random.number({ min: 1, max: 5 }),
          date: faker.date.past(1),
          reviewText: faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 2, max: 6 })),
          recommended: faker.random.boolean(),
          photos,
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
      console.log('product ', i, ' created')
    }

  })
  .then(() => { 
    console.log('db seeded')
  })
  .catch(err => console.log(err))