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

	// It seems this code is not being reached after redirect and callback from AWS ***********************************************************
	  sessionStorage.setItem('test', 'abcd');
	 // let location = useLocation();
	  const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	  // then save query param to local storage
	  sessionStorage.setItem("token", queryParams.token)
	  console.log("queryParams =",queryParams);
	// It seems this code is not being reached after redirect and callback from AWS ***********************************************************

	// Code for saving access token information. WIP **********************************************************
	/*  const fetches = {
		  loginFetch: (username, password) => {
			  return fetch('s://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/callback',{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				'Accepts' : 'application/json',
				token : localStorage.getItem('token')
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
				}).then(res => res.json())
		  }
		}

		export const loginUser = (username, password) => {
			return function(dispatch){
				fetches.loginFetch(username, password)
				.then(json => {
					if(json.token){
						localStorage.setItem('token', json.token)
						dispatch({
							type: "SET_USER",
							payload: json
						})
					} else {
						console.log(json.error)
					}
				})
			}
		} */
	// Code for saving access token information. WIP **********************************************************


	}


	// Changing this value window.location.href= will change the redirect. The question is how do I change /dev/login to redirect to the proper URL and not google.com
	// Solved by creating a new lambda function with a similar name and giving it a new API endpoint called /logon instead of /login.
	// window.location.href= 'https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/login'

	// send a cookie before returning
/*	if (!this.props.match.params.code)
	{
	//	window.location.href= 'https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/logon'
	//https://boisestateorcidauthentication.auth.us-west-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=7dtn7vm3gb4m0fl51hmbpihaa6&redirect_uri=https%3A//spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/callback%3Fstate%3Dstate=b660a377-04e2-4524-bee8-54b0b97df8a3
		let url= encodeURI('https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/logon')
		window.location.href= url;

	} */

		// var params = {
		// 	client_id:     this.appId,
		// 	client_secret: this.appClientSecret,
		// 	//code:          openCode, // This is the code from the query string in URL
		// 	// remove state for now. state:         newState,
		// 	redirect_uri:  'http://localhost:3000',
		// 	grant_type:    'authorization_code'
		//   };

		//   const axios = require('axios')

		//   axios.post('https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/callback', {
		// 		params
		//   })
		// 	.then(function (response) {
		// 	  console.log(response);
		// 	})

/*			axios.post('https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/logon', {
				Name: 'Fred',
				Age: '23'
			  })
			  .then(function (response) {
				console.log(response);
			  }) */


	/*	const search = window.location.search;
		const params = new URLSearchParams(search);
		const foo = params.get('code'); */

	//const query = new URLSearchParams(this.props.location.search);
	//const token = query.get('token')
	//console.log(token)//123

	//	console.log(this.props);
	//qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).__firebase_request_key
	  //window.location.href = 'https://twitter.com/home'
	/*if query paramater code = true then save code and send them to the login function with orcid
	pass token to the callback function tell orcid to go exchange code and send it back.
	explain when complete */

	//checkLoginStatus()
	// TODO: Backend Function for redirect login to Boise State -- Complete
	// TODO: Backend Function for callback from Boise State
	// TODO: Backend Function for callback from ORCID

	// TODO: Check for access token (Session Storage)
	// TODO: If no token, check to see if they are logged in
	// TODO: If not logged in, redirect out to AWS Lambda to redirect to Boise State Login

	// TODO: Redirect to AWS Lambda to redirect to ORCID token exchange
	// TODO: Look for query parameter to know if ORCID code was successfull
/*
  render() {
    return (
      <div>
	  { this.state.success ?
	    <div>
		  SUCCESS
		</div>
	    :
		<div>ERROR</div>
	  }
      </div>
    );
  }
}

export default Login;
*/

  render() {
	const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).access_token
	// then save query param to local storage
	sessionStorage.setItem("token", queryParams.token)
	console.log("queryParams =",queryParams);
    return (
      <div>Medium Tutorial: {this.props.match.params.code}</div>
//	  <div>Saving Access Token :  {this.props.match.params.code}</div>
	  
    );
  }
}

export default Login;