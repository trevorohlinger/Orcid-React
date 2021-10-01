import React, { Component } from 'react';
import queryString from 'query-string'

import axios from 'axios';
import { isCompositeComponent } from 'react-dom/test-utils';

const values = queryString.parse(window.location.search)


class Access extends Component {
  constructor(props) {
  
	super(props);
  
  console.log(JSON.stringify(values))
    this.state = {
      success : false,
    };
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(window.atob(base64))
  }

    componentDidMount() {
      const API_URL = process.env.REACT_APP_API_URL;

      //values = queryString.parse(window.location.search)
      console.log(JSON.stringify(values.access_token))
      console.log(JSON.stringify(values.code))

    if (values.access_token)
    {
      sessionStorage.setItem("success", false)
      console.log("We are inside of if (values.access_token)")
      sessionStorage.setItem("access_token", values.access_token)
      let unparsedToken = values.access_token
      let parsedToken = this.parseJwt(values.access_token)
      // employeeID is here
      console.log(parsedToken["urn:oid:1.2.840.113556.1.2.610"])
      sessionStorage.setItem("parsed_token", parsedToken["urn:oid:1.2.840.113556.1.2.610"])
      console.log("We are inside of if (values.access_token)")
      this.state.success = true;
      sessionStorage.setItem("success", true) 

    //window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}success`
  // window.location.href='https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=https://localhost:3000/access'
     window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}access`
  //window.location.href=`https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/updateDB`

    } else if (values.code)
      {
      console.log("We are inside of else if (values.code)")
      console.log("parsed_token =", sessionStorage.getItem("parsed_token"))
      axios({
        method: 'post',
        url: 'https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid',
        headers: {
      //    'Authorization': `Basic ${values.access_token}`
      //    'Authorization': `Bearer ${sessionStorage.getItem("access_token")}`
      },
      data: {
        code          :  values.code,
        redirect_uri  : `${API_URL}access`,
        employeeID   : sessionStorage.getItem("parsed_token"),
        //employeeID   : this.parseJwt(sessionStorage.getItem("access_token"))["urn:oid:1.2.840.113556.1.2.610"]
        //employeeID   : this.parseJwt(values.access_token)["urn:oid:1.2.840.113556.1.2.610"]
        
      }
    }) 
    .then (res => console.log("result returned ",res))
    console.log("success = ", (sessionStorage.getItem("success"))); 
    //This is not currently working properly. This is the last thing I worked on as of 7-14-2021
   // window.location.href=`${API_URL}success`
  } else if (values.access_token && this.state.success == false)
        {
          sessionStorage.setItem("access_token", values.access_token)
          //let parsedToken = this.parseJwt(values.access_token)
          //employeeID is here
          //console.log(parsedToken["urn:oid:1.2.840.113556.1.2.610"])
          //sessionStorage.setItem("parsed_token", parsedToken["urn:oid:1.2.840.113556.1.2.610"])
          this.setState({success: true})      
          window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}access`
        //window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}success`
  } else {
      console.log("User denied authorization or authorization has failed. Attempting to get permission again")
      window.location.href=`${API_URL}denied`
  } 
}

  render() {
    return (
        <h1>Thank you for authorizing Boise State University to make changes to your account. We will update your ORCID profile with your works cited as needed. You may close this window.</h1>

    );
  }
}

export default Access;