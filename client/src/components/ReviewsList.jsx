import React from 'react';
import Review from './Review';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    
    return (
      <div>
      {this.props.currentProductReviews.reviews.map((review, index) => {
        return (
          <Review review={review} key={index} />
          )
        })}
    </div>
  )
}
}
 
export default ReviewsList