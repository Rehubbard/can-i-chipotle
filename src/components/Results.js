import React, { Component } from 'react'

class Results extends Component {
  render () {
    return (
      <div>
        {this.props.results.map(result => this.renderCard(result))}
      </div>
    )
  }

  renderCard = (result) =>
  <div className="card">
    <img className="card-img-top" src="..." />
    <div className="card-body">
      <p className="card-text">{result.vicinity}</p>
    </div>
  </div>
}

export default Results
