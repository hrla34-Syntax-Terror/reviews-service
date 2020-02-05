import React from 'react';
import ReviewsList from './ReviewsList';
import axios from 'axios';
import _ from 'lodash';

class ReviewsApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      currentProductReviews: [],
      filteredReviews: [],
      displayedReviews: [],
      displayStartIndex: 0,
      displayEndIndex: 0,
      reviewsLoaded: false,
      totalReviews: 0,
      avgReview: 0,
      avgReviewPercent: 0,
      scoreArr: [0, 0, 0, 0, 0, 0]
    };

    this.getAllReviews = this.getAllReviews.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();

  }

  filterByStars() {
    // filter currentProductReviews

  }

  showWriteReview() {

  }

  showMoreReviews() {
    var totalReviews = this.state.totalReviews;
    var displayEndIndex = this.state.displayEndIndex;

    if (displayEndIndex + 30 > totalReviews) {
      displayEndIndex = totalReviews;
    } else {
      displayEndIndex += 30;
    }

    var displayedReviews = this.state.filteredReviews.slice(0, displayEndIndex - 1);

    this.setState({ displayedReviews, displayEndIndex});
  }
  

  getAllReviews() {
    axios.get('/api')
      .then(reviews => this.setState({
        reviews: reviews.data
      }))
      .then(() => {
        // randomize reviews
        // var randomIndex = Math.floor(1 + Math.random() * this.state.reviews.length);
        // var currentProductReviews = this.state.reviews[randomIndex].reviews;
        // then set state currentProductReviews
        this.setState({
          currentProductReviews: this.state.reviews[0].reviews,
          reviewsLoaded: true
        });
      })
      .then(() => {
        var totalReviews = this.state.currentProductReviews.length;
        var scoreArr = this.state.scoreArr.slice();
        var filteredReviews = this.state.currentProductReviews.slice();
        var displayedReviews = filteredReviews.slice(0, 8);
        if (totalReviews < 8) {
          var displayEndIndex = totalReviews;
        } else {
          var displayEndIndex = 8
        }
        var avgReview = Math.round(((_.reduce(this.state.currentProductReviews, (sum, review) => {
          scoreArr[review.stars]++;
          return sum + review.stars
        }, 0)) / totalReviews) * 10) / 10;
        var avgReviewPercent = avgReview * 20;
        this.setState({ totalReviews, avgReview, scoreArr, displayedReviews, avgReviewPercent, filteredReviews, displayEndIndex });
      })
      .catch(err => console.error(err))
  }

  render() {

    return (
      <div className="jh-main-container">
        <div className="jh-reviews-header-label">Reviews</div>
        <a href='#jh-write-review'><button className='jh-write-review' onClick={() => this.showWriteReview()}>Write a review</button></a>
        {this.state.reviewsLoaded ? (
          <div className="jh-summary-container">
            <div className="jh-rating-snapshot">
              <div className="jh-histogram">
                <div className="jh-rating-snapshot-label">Rating Snapshot</div>
                <div className="jh-rating-snapshot-body-text">Select a row below to filter reviews</div>
                <div className="jh-graphs-box">
                  {
                    this.state.scoreArr.map((total, index) => {
                      if (index === 0) {
                        return null
                      } else {

                        return (
                          <div className="jh-bar-graph-box" key={index}>
                            <div className="jh-bar-graph-label">{index} ★ </div>
                            <div className="jh-bar-graph-container">
                              <div className="jh-bar-graph-empty"></div>
                              <div className="jh-bar-graph-fill" style={{ width: 100 * (total / this.state.totalReviews) + '%' }}></div>
                            </div>
                            <div className="jh-bar-graph-num">{total}</div>
                          </div>
                        )
                      }
                    })}
                </div>
                <div className="jh-totalreviews-box">{this.state.displayStartIndex + 1}-{this.state.displayEndIndex} of {this.state.totalReviews} Reviews</div>
              </div>
              <div className="jh-avg-box">
                <div className="jh-avg-box-label">Average Customer Ratings</div>
                <div className="jh-avg-stars-row">
                  <div className="jh-avg-box-overall">Overall</div>
                  <div className="jh-avg-stars-box">
                    <span className="jh-avg-stars-blank">★★★★★</span>
                    <span className="jh-avg-stars-fill" style={{ width: this.state.avgReviewPercent + '%' }}>★★★★★</span>
                  </div>
                  <div className="jh-avg-stars-num">{this.state.avgReview}</div>
                </div>
              </div>
              <div className="jh-star-filter-box">

              </div>
            </div>
            <div id='jh-write-review'><a href='jh-write-review'></a></div>
            <ReviewsList
              currentProductReviews={this.state.displayedReviews}
            />
            <div className="jh-show-more"><button onClick={this.showMoreReviews}>Load More</button></div>
          </div>
        ) : (
            <div> no reviews yet</div>
          )}
      </div>
    )
  }
}

export default ReviewsApp;