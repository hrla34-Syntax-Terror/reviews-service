import React from 'react';
import moment from 'moment';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stars: this.props.review.stars,
      photos: [], /* this.props.review.photos */
      yes: this.props.review.helpful.yes,
      no: this.props.review.helpful.no,
      report: 'Report as inappropriate',
      helpfulClass: 'jh-helpful-button',
      colorR: '',
      colorG: '',
      reportClass: 'jh-report-button'
    }
    this.upVote = this.upVote.bind(this);
    this.reported = this.reported.bind(this);
  }

  upVote(e) {
    console.log(e.target)
    if (this.state.helpfulClass === 'jh-helpful-button') {
      this.setState({
        [e.target.getAttribute('name')]: this.state[e.target.getAttribute('name')] + 1,
        helpfulClass: 'jh-helpful-button-clicked',
        colorR: 'red',
        colorG: 'green'
      })
    }
  }

  reported() {
    this.setState({
      report: 'Reported',
      reportClass: 'jh-report-button-clicked'
    })
  }

  render() {

    return (
      <div className="jh-review-box">
        <div className="jh-name-box">
          <div className="jh-review-stars-box">
            <span className="jh-review-stars-blank">★★★★★</span>
            <span className="jh-review-stars-fill" style={{ width: (this.state.stars * 20) + '%' }}>★★★★★</span>
          </div>
          <span className="jh-name-label">{this.props.review.username}</span>&nbsp;
      <span>·</span>&nbsp;
      <span className="jh-time-box">{moment(this.props.review.date).fromNow()}</span></div>
        <div className="jh-title-box">{this.props.review.title}</div>
        <div className="jh-review-text-box">{this.props.review.reviewText}</div>
        <div className="jh-recommend-box">{this.props.review.recommended ? (
          <div className="jh-recommend-result">✔ Yes, I recommend this product.</div>
        ) : (
            <div className="jh-recommend-result">✘ No, I don't recommend this product.</div>
          )}</div>
        <div className="jh-helpful">Helpful?&nbsp;
          <button
            onClick={(e) => this.upVote(e)}
            name='yes'
            className={this.state.helpfulClass} >Yes ·&nbsp;
          <span style={{ color: this.state.colorG }}>{this.state.yes}</span>
          </button>

          <button
            onClick={(e) => this.upVote(e)}
            name='no'
            className={this.state.helpfulClass} >No ·&nbsp;
          <span style={{ color: this.state.colorR }}>{this.state.no}</span>
          </button>

          <button
            onClick={() => this.reported()}
            className={this.state.reportClass} >{this.state.report}</button>
        </div>
      </div>
    )
  }
}

export default Review