import React from 'react';
import moment from 'moment';

const Review = (props) => {

  var stars = ''
  for(var i =0; i < props.review.stars; i++) {
    stars += '★'
  }
  
  return (
    <div className="jh-review-box">
      <div className="jh-name-box">
        
      <span className="jh-stars-box">{stars}</span>&nbsp;
      <span className="jh-name-label">{props.review.username}</span>&nbsp; 
      <span>·</span>&nbsp; 
      <span className="jh-time-box">{moment(props.review.date).fromNow()}</span></div>
      <div className="jh-title-box">{props.review.title}</div>
      <div className="jh-review-text-box">{props.review.reviewText}</div>
      <div className="jh-recommend-box">Recommend: {props.review.recommended.toString()}</div>
      <div className="jh-helpful-yes-box">Helpful: {props.review.helpful.yes}</div>
      <div className="jh-helpful-no-box">Nope: {props.review.helpful.no}</div>
    </div>
  )
}

export default Review