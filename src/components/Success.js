import React, { Component } from 'react';
import queryString from 'query-string'

class Success extends Component {
  constructor(props) {
	super(props);

    this.state = {
      success : false,
    };

  }

    componentDidMount() {
    

    }
  render() {
    return (
        <h1>Thank you for authorizing Boise State University to make changes to your account. You may close this window.</h1>
    );
  }
}

export default Success;