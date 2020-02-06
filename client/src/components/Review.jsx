import React from 'react';
import moment from 'moment';

const Review = (props) => {

  return (
    <div className="jh-review-box">
      <div className="jh-name-box">
        <div className="jh-review-stars-box">
          <span className="jh-review-stars-blank">★★★★★</span>
          <span className="jh-review-stars-fill" style={{ width: (props.review.stars * 20) + '%' }}>★★★★★</span>
        </div>
      <span className="jh-name-label">{props.review.username}</span>&nbsp;
      <span>·</span>&nbsp;
      <span className="jh-time-box">{moment(props.review.date).fromNow()}</span></div>
      <div className="jh-title-box">{props.review.title}</div>
      <div className="jh-review-text-box">{props.review.reviewText}</div>
      <div className="jh-recommend-box">Recommend: {props.review.recommended.toString()}</div>
      <div className="jh-helpful">
        <div className="jh-helpful-yes-box">Helpful: {props.review.helpful.yes}</div>
        <div className="jh-helpful-no-box">Nope: {props.review.helpful.no}</div>
      </div>
    </div>
  )
}

export default Review