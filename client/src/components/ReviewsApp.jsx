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
      totalDisplayedReviews: 0,
      avgReview: 0,
      avgReviewPercent: 0,
      scoreArr: [0, 0, 0, 0, 0, 0],
      starFilters: [0, 0, 0, 0, 0, 0],
      isFiltered: false,
      numFilters: 0
    };

    this.getAllReviews = this.getAllReviews.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.filterByStars = this.filterByStars.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
  }

  clearFilter(e) {
    // TODO: filter out reviews with num stars from e.target
    var starFilters = this.state.starFilters.slice();
    var {numFilters, isFiltered} = this.state;
    var starIdx = e.target.getAttribute('stars');
    starFilters[starIdx] = 0;
    numFilters = numFilters - 1;
    var displayedReviews = this.state.displayedReviews.filter(review => review.stars.toString() != starIdx)
    if (numFilters === 0) {
      isFiltered = false;
      displayedReviews = this.state.currentProductReviews;
    }
    var totalDisplayedReviews = displayedReviews.length;
    if (totalDisplayedReviews < 8) {
      var displayEndIndex = totalDisplayedReviews;
    } else {
      var displayEndIndex = 8
    }
    this.setState({ starFilters, numFilters, isFiltered, displayedReviews, totalDisplayedReviews, displayEndIndex });
  }

  clearAllFilters() {
    var starFilters = [0, 0, 0, 0, 0, 0];
    var isFiltered = false;
    var numFilters = 0;
    var displayedReviews = this.state.currentProductReviews;
    var totalDisplayedReviews = this.state.totalReviews;
    var displayEndIndex = 8;
    this.setState({ starFilters, numFilters, isFiltered, displayedReviews, totalDisplayedReviews, displayEndIndex});
  }

  filterByStars(e) {
    e.preventDefault();
    var starFilters = this.state.starFilters.slice();
    var {numFilters} = this.state;
    var starIdx = e.target.getAttribute('stars');
    if (this.state.scoreArr[starIdx]) {
      if (numFilters === 0) {
        var oldFilteredReviews = [];
      } else {
        var oldFilteredReviews = this.state.filteredReviews.slice();
      }
      numFilters = numFilters +1;
      starFilters[starIdx] = 1;
      var isFiltered = true;
      var newFilteredReviews = this.state.currentProductReviews.filter(review => review.stars.toString() === starIdx);
      var filteredReviews = oldFilteredReviews.concat(newFilteredReviews);
      if (filteredReviews.length < 8 ) {
        var displayEndIndex = filteredReviews.length;
      } else {
        var displayEndIndex = 8;
      }
      var displayStartIndex = 0
      var displayedReviews = filteredReviews.slice(displayStartIndex, displayEndIndex);
      var totalDisplayedReviews = displayedReviews.length;
      this.setState({ starFilters, isFiltered, numFilters, filteredReviews, displayedReviews, displayStartIndex, displayEndIndex, totalDisplayedReviews });
    }

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
    this.setState({ displayedReviews, displayEndIndex });
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
        var totalDisplayedReviews, totalReviews = this.state.currentProductReviews.length;
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
        this.setState({ totalReviews, avgReview, scoreArr, displayedReviews, avgReviewPercent, filteredReviews, displayEndIndex, totalDisplayedReviews });
      })
      .catch(err => console.error(err))
  }

  render() {

    return (
      <div className="jh-main-container">
        <div className="jh-reviews-header-label">Reviews</div>
        <div className="jh-write-review-box">
          <a href='#jh-write-review'><button className='jh-write-review' onClick={() => this.showWriteReview()}>Write a review</button></a>
        </div>
        {this.state.reviewsLoaded ? (
          <div className="jh-summary-container">
            <div className="jh-rating-snapshot">
              <div className="jh-histogram">
                <div className="jh-rating-snapshot-label">Rating Snapshot</div>
                <div className="jh-rating-snapshot-body-text">Select a row below to filter reviews</div>
                <div className="jh-graphs-box">
                  {this.state.scoreArr.map((total, index) => {
                    if (index === 0) {
                      return null
                    } else {
                      return (
                        <div className="jh-bar-graph-box" key={index} stars={index} onClick={this.filterByStars}>
                          <div className="jh-bar-graph-label" stars={index}>{index} ★ </div>
                          <div className="jh-bar-graph-container" stars={index}>
                            <div className="jh-bar-graph-empty" stars={index}></div>
                            <div className="jh-bar-graph-fill" stars={index} style={{ width: 100 * (total / this.state.totalReviews) + '%' }}></div>
                          </div>
                          <div className="jh-bar-graph-num" stars={index}>{total}</div>
                        </div>
                      )
                    }
                  })}
                </div>
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
            </div>
            <div className="jh-totalreviews-box">{this.state.displayStartIndex + 1}-{this.state.displayEndIndex} of {this.state.totalDisplayedReviews} Reviews</div>
            {this.state.isFiltered ? (
              <div className="jh-star-filter-container">
                <div className="jh-star-filter-label">Active Filters</div>
                <div className="jh-star-filter-boxes">
                  {this.state.starFilters.map((value, index) => {
                    if (value) {
                      return (
                        <div className="jh-star-filter-box" key={index} stars={index} onClick={this.clearFilter}>
                          <div className="jh-star-filter-box-label" stars={index}>{index} stars </div>&nbsp;
                          <div className="jh-star-filter-icon-img" stars={index}>
                            <img className="jh-star-filter-icon" stars={index} src="../icons/x-fill-white.svg" />
                          </div>
                        </div>
                      )
                    }
                  })}
                  <div className="jh-clear-all-box" onClick={this.clearAllFilters}>
                    <div className="jh-star-filter-box-label">Clear All</div>&nbsp;
                  <div className="jh-star-filter-icon-img">
                      <img className="jh-star-filter-icon" src="../icons/x-fill.svg" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div></div>
              )}
            <div id='jh-write-review'><a href='jh-write-review'></a></div>
            <ReviewsList
              currentProductReviews={this.state.displayedReviews}
            />
            {this.state.totalReviews === this.state.displayEndIndex ? (
              <div></div>
            ) : (
                <div className="jh-show-more-box"><button className="jh-show-more-button" onClick={this.showMoreReviews}>Load More</button></div>
              )}
          </div>
        ) : (
            <div> no reviews yet</div>
          )}
      </div>
    )
  }
}

export default ReviewsApp;