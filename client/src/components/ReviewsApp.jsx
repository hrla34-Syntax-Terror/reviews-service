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
      displayEndIndex: 0,
      reviewsLoaded: false,
      totalReviews: 0,
      totalDisplayedReviews: 0,
      avgReview: 0,
      avgReviewPercent: 0,
      scoreArr: [0, 0, 0, 0, 0, 0],
      starFilters: [0, 0, 0, 0, 0, 0],
      isFiltered: false,
      numFilters: 0,
      currentSelection: 'Most Relevant'
    };

    this.getAllReviews = this.getAllReviews.bind(this);
    this.getReview = this.getReview.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.filterByStars = this.filterByStars.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.renderInitialProductData = this.renderInitialProductData.bind(this);
  }

  componentDidMount() {
    var id = window.location.href.slice(22);
    if (id === '') { id = 0 }
    this.getReview(id);
  }

  clearFilter(e) {
    var starFilters = this.state.starFilters.slice();
    var { numFilters, isFiltered } = this.state;
    var starIdx = e.target.getAttribute('stars');
    starFilters[starIdx] = 0;
    numFilters = numFilters - 1;
    var displayedReviews = this.state.displayedReviews.filter(review => review.stars.toString() != starIdx)
    if (numFilters === 0) {
      isFiltered = false;
      displayedReviews = this.state.currentProductReviews.slice(0, 8);
    }
    var totalDisplayedReviews = displayedReviews.length;
    if (totalDisplayedReviews < 8) {
      var displayEndIndex = totalDisplayedReviews;
    } else {
      var displayEndIndex = 8
    }

    this.setState({
      starFilters,
      numFilters,
      isFiltered,
      displayedReviews,
      totalDisplayedReviews,
      displayEndIndex
    });
  }

  clearAllFilters() {
    var starFilters = [0, 0, 0, 0, 0, 0];
    var isFiltered = false;
    var numFilters = 0;
    var displayedReviews = this.state.currentProductReviews;
    var totalDisplayedReviews = this.state.totalReviews;
    var displayEndIndex = 8;

    this.setState({
      starFilters,
      numFilters,
      isFiltered,
      displayedReviews,
      totalDisplayedReviews,
      displayEndIndex
    });
  }

  filterByStars(e) {
    e.preventDefault();
    var starFilters = this.state.starFilters.slice();
    var { numFilters } = this.state;
    var starIdx = e.target.getAttribute('stars');

    if (this.state.scoreArr[starIdx]) {
      if (numFilters === 0) {
        var oldFilteredReviews = [];
      } else {
        var oldFilteredReviews = this.state.filteredReviews.slice();
      }
      numFilters = numFilters + 1;
      starFilters[starIdx] = 1;
      var isFiltered = true;
      var newFilteredReviews = this.state.currentProductReviews.filter(review => review.stars.toString() === starIdx);
      var filteredReviews = oldFilteredReviews.concat(newFilteredReviews);
      if (filteredReviews.length < 8) {
        var displayEndIndex = filteredReviews.length;
      } else {
        var displayEndIndex = 8;
      }
      var displayedReviews = filteredReviews.slice(0, displayEndIndex);
      var totalDisplayedReviews = displayedReviews.length;

      this.setState({
        starFilters,
        isFiltered,
        numFilters,
        filteredReviews,
        displayedReviews,
        displayEndIndex,
        totalDisplayedReviews
      });
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
    axios.get('http://localhost:6969/api')
      .then(reviews => this.setState({
        reviews: reviews.data
      }))
      .then(() => {
        var randomIndex = Math.floor(Math.random() * this.state.reviews.length);
        var currentProductReviews = this.state.reviews[randomIndex].reviews;

        this.setState({
          currentProductReviews,
          reviewsLoaded: true
        });
      })
      .then(() => {
        var totalDisplayedReviews = this.state.currentProductReviews.length;
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
        this.setState({
          totalReviews,
          avgReview,
          scoreArr,
          displayedReviews,
          avgReviewPercent,
          filteredReviews,
          displayEndIndex,
          totalDisplayedReviews
        });
      })
      .catch(err => console.error(err))
  }

  getReview(productID) {
    axios.get(`http://localhost:6969/api/${productID}`)
      .then(reviews => {
        this.setState({
        currentProductReviews: reviews.data[0].reviews,
        reviewsLoaded: true
      })})
      .then(() => { this.renderInitialProductData() })
      .catch(err => console.error(err))
  }

  renderInitialProductData() {
    var totalDisplayedReviews = this.state.currentProductReviews.length;
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
    this.setState({
      totalReviews,
      avgReview,
      scoreArr,
      displayedReviews,
      avgReviewPercent,
      filteredReviews,
      displayEndIndex,
      totalDisplayedReviews
    });
  }

  render() {

    return (
      <div className="jh-module-container">
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
                <div className="jh-graphs-container">
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

            <div className="jh-totals-sorting-box">
              <div className="jh-totalreviews-box">1 - {this.state.displayEndIndex} of {this.state.filteredReviews.length} Reviews</div>
              <div className="jh-sorting-box"><span className='jh-sortby'>Sort by:&nbsp;
              <button className='jh-dropdown-btn'>{this.state.currentSelection}</button>&#9662;
              <div className='jh-dropdown-selection'>
                  <div name='newestQ' onClick={(e) => this.clickSelection(e)}>Most Relevant</div>
                  <div name='newestAns' onClick={(e) => this.clickSelection(e)}>Most Helpful</div>
                  <div name='mostAns' onClick={(e) => this.clickSelection(e)}>Highest to Lowest Rating</div>
                  <div name='ansNeeded' onClick={(e) => this.clickSelection(e)}>Lowest to Highest Rating</div>
                  <div name='mostHelpful' onClick={(e) => this.clickSelection(e)}>Most Recent</div>
                </div>
              </span></div>
            </div>
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
                            <img className="jh-star-filter-icon" stars={index} src="http://localhost:6969/icons/x-fill-white.svg" />
                          </div>
                        </div>
                      )
                    }
                  })}
                  <div className="jh-clear-all-box" onClick={this.clearAllFilters}>
                    <div className="jh-star-filter-box-label">Clear All</div>&nbsp;
                  <div className="jh-star-filter-icon-img">
                      <img className="jh-star-filter-icon" src="http://localhost:6969/icons/x-fill.svg" />
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
            <div>Loading...</div>
          )}
      </div>
      </div>
    )
  }
}

export default ReviewsApp;