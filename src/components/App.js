import React, { Component } from 'react';
import { geocoderService, placesService, placesOKStatus, mapService } from '../google-maps'
import Search from './Search'
import Results from './Results'

const SEARCH_KEYWORD = 'Chipotle'
const SEARCH_RADIUS = '32186'
const SEARCH_TYPE = ['restaurant']

class App extends Component {

  state = {
    results: [],
    searchValue: ''
  }
  createMapAndNearbySearch = (LatLng, searchValue) => {
    const map = mapService(document.getElementById('map'), { center: LatLng, zoom: 8 })

    const places = placesService(map);
    places.textSearch({ location: LatLng, radius: SEARCH_RADIUS, query: SEARCH_KEYWORD, type: SEARCH_TYPE }, (results, status) => {
      
      // filter "fake" results. Sometimes other mexican restaurants were included in the results. (ex: Moe's Southwest Grill)
      const filteredResults = results.filter(result => result.name.toLowerCase().includes('chipotle'))
      this.setState({
        results: filteredResults,
        searchValue: searchValue
      })
    })
  }

  placesNearbySearch = (searchValue) => {
    geocoderService.geocode({ address: searchValue }, (results, status) => {
      this.createMapAndNearbySearch(results[0].geometry.location, searchValue)
    })
  }

  render () {
    return (
      <div className='main-wrap'>
        <div className='content-wrap'>
          <Search
            placesNearbySearch={this.placesNearbySearch.bind(this)}
          />
          <Results 
            results={this.state.results}
            searchValue={this.state.searchValue}
          />
        </div>
        <div className='footer'>&copy; 2018 Eric Hubbard</div>
      </div>
    );
  }
}

export default App

