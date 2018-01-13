import React, { Component } from 'react'
import _ from 'lodash'
import { autocompleteService, geocoderService, placesService, placesOKStatus, mapService } from '../google-maps'


class Search extends Component {
  state = {
    address: '',
    predictions: []
  }

  onChange = (e) => { 
    this.setState({address: e.target.value}) 
  }

  getAutocompletePlaces = _.debounce(() => {
    if (this.state.address !== '') {
      autocompleteService.getPlacePredictions({ input: this.state.address, type: ['locality'] }, (predictions, status) => {
        if (status != placesOKStatus) {
          alert(status)
          return
        }
        this.setState({
          predictions
        })
      })
    }
    }, 150)

  handleSearch = (e) => {
    e.preventDefault()
    let address = e.currentTarget.textContent
    geocoderService.geocode({ address: address }, (results, status) => {
      this.createMap(results[0].geometry.location)
    })
  }

  createMap = (LatLng) => {
    const map = mapService(document.getElementById('map'), { center: LatLng, zoom: 8 })

    const places = placesService(map);
    places.nearbySearch({ location: LatLng, radius: '32186', name: 'Chipotle', keyword: 'chipotle', type: ['restaurant']}, (results, status) => {
      this.props.handleResults(results)
    });
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSearch.bind(this)}>
          <input
            value={this.state.address}
            onChange={this.onChange.bind(this)}
            onKeyUp={() => { this.getAutocompletePlaces() }}
          />
        </form>
        {(this.state.predictions.length > 0 && this.state.address.length > 0) && this.renderPredictions()}

      </div>
    
    )
  }

  renderPredictions = () =>
    this.state.predictions.map(({ description, id }) => {
      return <div key={id} onClick={(e) => { this.handleSearch(e) }}>{description}</div>
    })
}

export default Search
