import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {incrementCounter, decrementCounter} from './testActions'

const mapState = (state) => {
  return {data: state.test.data};
}

const actions = {
  incrementCounter, 
  decrementCounter
}

class testComponent extends Component {
  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({scriptLoaded: true})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  onChange = (address) => {
    this.setState({address})
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyACQUMP3l5Va31lnSfVBuEH7juyhBFLiXU&libraries=places'
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h2>test data is: {this.props.data}</h2>
        <Button onClick={this.props.incrementCounter} color="green" content="+1" />
        <Button onClick={this.props.decrementCounter} color="red" content="-1"/>
        <br/><br/>

        {this.state.scriptLoaded && 
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete inputProps={inputProps} />
          <button type="submit">Submit</button>
        </form>}


      </div>
    )
  }
}

export default connect(mapState, actions)(testComponent)