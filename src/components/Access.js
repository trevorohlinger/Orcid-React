
/* Importing different components and using axios for post request
*/
import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios';
import { isCompositeComponent } from 'react-dom/test-utils';

//We are parsing the URL string here
const values = queryString.parse(window.location.search)
require('dotenv').config()


class Access extends Component {
  constructor(props) {
  
	super(props);
  
  // Used to check the state of parsing out values from the URL string
  console.log(JSON.stringify(values))
    this.state = {
      success : false,
    };
  }

  /* Parsing out a researcher's Boise State ID number from a JWT Token
    using parseJWT built-in react function */
  parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(window.atob(base64))
  }

    /* Setting the environment variable values here */
    componentDidMount() {
      const API_URL = process.env.REACT_APP_API_URL;
      const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
      const ORCID_URL = process.env.REACT_APP_ORCID_URL;
      const ENV_LINK = process.env.REACT_APP_ENV_LINK;

    //Logging values for our access token and code for debugging purposes
      console.log(JSON.stringify(values.access_token))
      console.log(JSON.stringify(values.code)) 

    /* Here we are begin a series of checks. 
      The first of which is checking to see if we parsed a valid access_token. 
      We then set the parsed_token to a value that translates into the Boise State ID number
      and recursively jump back into the access page by calling window.location.href.../access */  
    if (values.access_token)
    {
      sessionStorage.setItem("success", false)
      //console.log("We are inside of if (values.access_token)")
      sessionStorage.setItem("access_token", values.access_token)
      let unparsedToken = values.access_token
      let parsedToken = this.parseJwt(values.access_token)

      // employeeID is used here
      console.log(parsedToken["urn:oid:1.2.840.113556.1.2.610"])
      sessionStorage.setItem("parsed_token", parsedToken["urn:oid:1.2.840.113556.1.2.610"])
      console.log("We are inside of if (values.access_token)")
      this.state.success = true;
      sessionStorage.setItem("success", true) 

      // Here we jump to 
      window.location.href=`${ORCID_URL}client_id=${CLIENT_ID}&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}access`

    /* If we didn't have values.access_token set we will check if values.code is set.
      Next we post values.code to our /orcid page. Once this is complete we jump back into our AWS Lambdas
    */
    } else if (values.code)
      {
      console.log("parsed_token =", sessionStorage.getItem("parsed_token")) 
      axios({
        method: 'post',
        url: `${ENV_LINK}/orcid`,
        headers: {
      },
      data: {
        code          :  values.code,
        redirect_uri  : `${API_URL}access`,
        employeeID   : sessionStorage.getItem("parsed_token"),      
      }
    }) 
    .then (res => console.log("result returned ",res))
      console.log("success = ", (sessionStorage.getItem("success"))); 
  } else if (values.access_token && this.state.success == false)
        {
          sessionStorage.setItem("access_token", values.access_token)
          this.setState({success: true})      
          window.location.href=`${ORCID_URL}client_id=${CLIENT_ID}&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}access`
  /* If the user has denied our request for access to their ORCID account we send them to the denied page */
  } else {
      console.log("User denied authorization or authorization has failed. Attempting to get permission again")
      window.location.href=`${API_URL}denied`
  } 
}

  render() {
    return (
        <h1>Thank you for authorizing Boise State University to make changes to your account. You may close this window.</h1>
    );
  }
}

export default Access;