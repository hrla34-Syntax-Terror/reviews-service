import React from 'react';
import Review from './Review';

const ReviewsList = (props) => {
  console.log('reviewsList props', props);

  return (
    <div>
      <div>I a ReviewList</div>
      {props.currentProductReviews.reviews.map((review, index) => {
        return (
          <Review review={review} key={index} />
        )
      })}
    </div>
  )
}

export default ReviewsList