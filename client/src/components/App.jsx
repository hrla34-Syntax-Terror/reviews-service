import React from 'react';
import ReviewsList from './ReviewsList';
import axios from 'axios';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      currentProductReviews: {},
      reviewsLoaded: false,
      totalReviews: 0,
      avgReview: 0,
      scoreArr: [0, 0, 0, 0, 0, 0]
    };

    this.getAllReviews = this.getAllReviews.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();

  }

  getAllReviews() {
    axios.get('/api')
      .then(reviews => this.setState({
        reviews: reviews.data
      }))
      .then(() => {
        this.setState({
          currentProductReviews: this.state.reviews[0],
          reviewsLoaded: true
        });
      })
      .then(() => {
        var totalReviews = this.state.currentProductReviews.reviews.length;
        var scoreArr = this.state.scoreArr.slice();
        var avgReview = Math.round(((_.reduce(this.state.currentProductReviews.reviews, (sum, review) => {
          scoreArr[review.stars]++;
          return sum + review.stars
        }, 0)) / totalReviews) * 10) / 10;
        this.setState({ totalReviews, avgReview, scoreArr });
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        Reviews
        {this.state.reviewsLoaded ? (
          <div>
            <div>
              <div>total Reviews: {this.state.totalReviews}</div>
              <div>avgReview: {this.state.avgReview}</div>
              <div>0: {this.state.scoreArr[1]} ** {100 * this.state.scoreArr[0]/this.state.totalReviews}%</div>
              <div>1: {this.state.scoreArr[1]} ** {100 * this.state.scoreArr[1]/this.state.totalReviews}%</div>
              <div>2: {this.state.scoreArr[2]} ** {100 * this.state.scoreArr[2]/this.state.totalReviews}%</div>
              <div>3: {this.state.scoreArr[3]} ** {100 * this.state.scoreArr[3]/this.state.totalReviews}%</div>
              <div>4: {this.state.scoreArr[4]} ** {100 * this.state.scoreArr[4]/this.state.totalReviews}%</div>
              <div>5: {this.state.scoreArr[5]} ** {100 * this.state.scoreArr[5]/this.state.totalReviews}%</div>
            </div>

            <ReviewsList
              currentProductReviews={this.state.currentProductReviews}
            />
          </div>
        ) : (
            <div> no reviews yet</div>
          )}
      </div>
    )
  }
}

export default App;