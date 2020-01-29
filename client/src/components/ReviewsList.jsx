import React from 'react';
import Review from './Review';

const ReviewsList = (props) => (
  <div>
  <div>I a ReviewList</div>
  <Review review={props.reviews[1]}/>
  <Review />
  <Review />
  </div>
)

export default ReviewsList