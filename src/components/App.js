import React, { Component } from 'react';
import Search from './Search'
import Results from './Results'

class App extends Component {

  state = {
    results: []
  }

  handleResults = (results) => {
    console.log(results)
    this.setState({ results: results })
  }

  render () {
    return (
      <div className='content-wrap d-flex flex-column justify-content-around align-items-center'>
        <div>
          <h2>google maps test</h2>
          <Search handleResults={this.handleResults.bind(this)} />
        </div>
        <div>
          {this.state.results.length > 0 ? <Results results={this.state.results} /> : <h2>Enter something to get a result</h2>}
        </div>
      </div>
    );
  }
}

export default App

