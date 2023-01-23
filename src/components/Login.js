	// Backend Function for redirect login to Boise State 	
	// Backend Function for callback from Boise State		
	// Backend Function for callback from ORCID				
	// Check for access token (Session Storage)				

/* Importing template react components and query-string 

*/
import React, { Component } from 'react';
import queryString from 'query-string'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

/* We are parsing out pieces of the URL in order to use OAUTH
 and prove we are a legitimate organization. */

var qs = require('qs');
var assert = require('assert');

var obj = qs.parse('a=c');
assert.deepEqual(obj, { a: 'c' });

var str = qs.stringify(obj);
assert.equal(str, 'a=c');


// This class is for when the user first clicks the link "Click here to create or connect your ORCID iD"

class Login extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  success : false,
	};


  }


  componentDidMount() {
	console.log("window = ", window)  
	  sessionStorage.setItem('test', 'abcd');
	  const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	  // then save query param to local storage
	  sessionStorage.setItem("token", queryParams.token)
	  console.log("queryParams =",queryParams);
	}

  render() {
	require('dotenv').config()
	const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	// then save query param to local storage
	sessionStorage.setItem("token", queryParams.token)
	console.log("queryParams =",queryParams);
    return (
      <div>Login {this.props.match.params.code}</div>
	  
    );
	}
}

export default Login;