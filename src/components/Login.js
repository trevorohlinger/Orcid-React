import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";


var qs = require('qs');
var assert = require('assert');

var obj = qs.parse('a=c');
assert.deepEqual(obj, { a: 'c' });

var str = qs.stringify(obj);
assert.equal(str, 'a=c');



class Login extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  success : false,
//	  appId : '700cb295-52f1-4ea6-8d5f-a48166209ed6',
//	  clientSecret : 'ocO9sMF7BWLhu_Z7x7nfUP9tsrsL5kL0o6Fm19qx',
	};


  }

	// getURL() {
	// 	let location = useLocation();
	// }

  componentDidMount() {
	console.log("window = ", window)  
	// It seems this code is not being reached after redirect and callback from AWS ***********************************************************
	  sessionStorage.setItem('test', 'abcd');
	 // let location = useLocation();
	  const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	  // then save query param to local storage
	  sessionStorage.setItem("token", queryParams.token)
	  console.log("queryParams =",queryParams);
	}

	//checkLoginStatus()
	// TODO: Backend Function for redirect login to Boise State -- Complete
	// TODO: Backend Function for callback from Boise State		-- Complete
	// TODO: Backend Function for callback from ORCID			-- Complete

	// TODO: Check for access token (Session Storage)			-- Complete
	// TODO: If no token, check to see if they are logged in
	// TODO: If not logged in, redirect out to AWS Lambda to redirect to Boise State Login

	// TODO: Redirect to AWS Lambda to redirect to ORCID token exchange
	// TODO: Look for query parameter to know if ORCID code was successfull

  render() {
	const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	// then save query param to local storage
	sessionStorage.setItem("token", queryParams.token)
	console.log("queryParams =",queryParams);
    return (
      <div>Login {this.props.match.params.code}</div>
//	  <div>Saving Access Token :  {this.props.match.params.code}</div>
	  
    );
  }
}

export default Login;