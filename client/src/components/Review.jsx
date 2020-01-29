import React from 'react';
import moment from 'moment';

const Review = (props) => {
  
  return (
    <div>
      <div>Name: {props.review.username}</div>
      <div>{props.review.title}</div>
      <div>{props.review.stars}/5 stars</div>
      <div>{moment(props.review.date).fromNow()}</div>
      <div>{props.review.reviewText}</div>
      <div>Recommend: {props.review.recommended.toString()}</div>
      <div>Helpful: {props.review.helpful.yes}</div>
      <div>Nope: {props.review.helpful.no}</div>
    </div>
  )
}

export default Review