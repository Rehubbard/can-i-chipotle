import React, { Component } from 'react'

import ThumbsUp from '../img/thumbsup.svg'
import ThumbsDown from '../img/thumbsdown.svg'

class Results extends Component {



  render () {
    console.log(this.props.searchValue)
    return (
      <div className='results-wrap container'>
        {this.props.searchValue.length > 0 && this.renderResultsHeader()}
        {this.props.results.length > 0 && this.props.results.map((result, i) => this.renderCard(result, i))}
          
      </div>
    )
  }

  renderResultsHeader = () =>
    <div className='results-header'>
      {this.props.results.length > 0 && this.renderYes() || this.renderNo()}
    </div>

  renderYes = () =>
    <div>
      <img src={ThumbsUp} alt="You can Chipotle. Congrats" />
      <h5>{this.props.results.length} Chipotles in your area</h5>
      <p>Results for: {this.props.searchValue}</p>
    </div>

  renderNo = () =>
    <div> 
      <img src={ThumbsDown} alt="You cannot Chipotle. Congrats" />
      <h5>No Chipotles in your area. You cannot Chipotle.</h5>
    </div>

  renderCard = (result, i) => {
    const hasImage = result.photos
    var imageUrl
    if (hasImage) {
      imageUrl = result.photos[0].getUrl({maxHeight: 250})
    } else {
      imageUrl = 'http://josephpanthony.com/wp-content/uploads/2017/06/placeholder2.png'
    }
    return (
      <div className="card mx-auto" key={i}>
          <div className="card-img-top" style={{backgroundImage: `url(${imageUrl})`}}></div>
          <div className="card-body">
            <p className="card-text">{result.formatted_address}</p>
            <a href={`https://www.google.com/maps/place/${result.formatted_address}`} className='btn btn-primary'>View</a>
          </div>
      </div>
    )
  }
}

export default Results
