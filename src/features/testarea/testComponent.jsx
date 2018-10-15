import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapState = (state) => {
  return {data: state.test.data};
}

class testComponent extends Component {
  render() {
    return (
      <div>
        <h1>Test Area</h1>
        <h2>test data is: {this.props.data}</h2>
      </div>
    )
  }
}

export default connect(mapState)(testComponent)