import React from 'react';
import ReviewsList from './ReviewsList';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
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
      .catch(err => console.error(err))
      .then(() => console.log(this.state.reviews))
      .catch(err => console.error(err));
  }



  render() {
    return (
      <div>
      <div>Hello this is App</div>
      <ReviewsList reviews={this.state.reviews}/>
      </div>
    )
  }
}

export default App;