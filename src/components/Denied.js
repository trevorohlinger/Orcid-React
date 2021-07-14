import React, { Component } from 'react';
import queryString from 'query-string'

class Denied extends Component {
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
        <h1>Please allow Boise State University access to your ORCID record. It allows us to keep your works cited up to date, which saves you valuable time. Please click logon and then authorize access.</h1>
    );
  }
}

export default Denied;