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
      <div className="jh-recommend-box">{props.review.recommended ? (
        <div className="jh-recommend-result">✔ Yes, I recommend this product.</div>
      ) : (
        <div className="jh-recommend-result">✘ No, I don't recommend this product.</div>
      )}</div>
      <div className="jh-helpful">Helpful?&nbsp;
        <button className="jh-helpful-button">Yes · {props.review.helpful.yes}</button>
        <button className="jh-helpful-button">No · {props.review.helpful.no}</button>
        <button className="jh-helpful-button">Report as Inappropriate</button>
      </div>
    </div>
  )
}

export default Review