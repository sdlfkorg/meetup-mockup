import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';
import {incrementCounter, decrementCounter} from './testActions'

const mapState = (state) => {
  return {data: state.test.data};
}

const actions = {
  incrementCounter, 
  decrementCounter
}

class testComponent extends Component {
  render() {
    return (
      <div>
        <h1>Test Area</h1>
        <h2>test data is: {this.props.data}</h2>
        <Button onClick={this.props.incrementCounter} color="green" content="+1" />
        <Button onClick={this.props.decrementCounter} color="red" content="-1"/>
      </div>
    )
  }
}

export default connect(mapState, actions)(testComponent)