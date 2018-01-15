import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { autocompleteService, placesOKStatus } from '../google-maps'
import GoogleLogo from '../img/powered_by_google_on_white.png'
import GoogleLogoWhite from '../img/powered_by_google_on_non_white.png'



class Search extends Component {
  state = {
    value: '',
    suggestions: []
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.placesNearbySearch(suggestionValue)
  }

  renderSuggestionsContainer = ({ containerProps , children, query }) => {
   if (children != null) {
     return (
       <div {...containerProps}>
        {children}
        <div style={{textAlign: 'right'}}>
          <img src={GoogleLogo} alt="Powered by Google" />
        </div>
      </div>
     )
   } else {
    return (
      <div {...containerProps}>
       <div style={{textAlign: 'right'}}>
         <img src={GoogleLogoWhite} alt="Powered by Google" />
       </div>
     </div>
    )
   }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim()

    inputValue.length === 0 
      ? [] 
      : autocompleteService.getPlacePredictions({ input: inputValue, type: ['locality'] }, (predictions, status) => {
          if (status != placesOKStatus) {
            return
          }
          console.log(predictions)
          this.setState({ suggestions: predictions })
        })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  getSuggestionValue = value => value.description

  renderSuggestion = ({ description }) =>
    <div>
      {description}
    </div>

  onChange = (event, { newValue }) => {
    this.setState({ 
      value: newValue
    })
  }

  render () {
    const inputProps = {
      onChange: this.onChange.bind(this),
      value: this.state.value,
      placeholder: "Enter your address or city..."
    }
    return (
      <div className='search-wrap'>
        <div className='container full-height text-center'>
          <h2>Can I Chipotle?</h2>
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
            getSuggestionValue={this.getSuggestionValue.bind(this)}
            renderSuggestion={this.renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer.bind(this)}
            highlightFirstSuggestion={true}
            inputProps={inputProps}
          />
        </div>
      </div>
    
    )
  }

}

export default Search
