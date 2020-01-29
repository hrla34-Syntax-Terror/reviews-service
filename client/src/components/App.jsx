import React from 'react';
import ReviewsList from './ReviewsList';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      currentProductReviews: {},
      reviewsLoaded: false
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
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <div>Hello this is App</div>
        {this.state.reviewsLoaded ? (
          <ReviewsList
            currentProductReviews={this.state.currentProductReviews}
          />
        ) : (
            <div> no reviews yet</div>
          )}
      </div>
    )
  }
}

export default App;