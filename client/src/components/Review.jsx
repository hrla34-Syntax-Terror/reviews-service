import React from 'react';

const Review = (props) => {
//  console.log('Review props.review ', props.review);
  return (
    <div>
      <div>oh hello im a lil review</div>
      <div>{props.review.username}</div>
    </div>
  )
}

export default Review