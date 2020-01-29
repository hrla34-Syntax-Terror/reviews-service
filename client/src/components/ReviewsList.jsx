import React from 'react';
import Review from './Review';

const ReviewsList = (props) => {

  return (
    <div>
      {props.currentProductReviews.reviews.map((review, index) => {
        return (
          <Review review={review} key={index} />
        )
      })}
    </div>
  )
}

export default ReviewsList