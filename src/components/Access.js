import React, { Component } from 'react';
import queryString from 'query-string'

import axios from 'axios';
import { isCompositeComponent } from 'react-dom/test-utils';

const values = queryString.parse(window.location.search)


class Access extends Component {
  constructor(props) {
    super(props);
  
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

      //testing using updateDB !!!!! DELETE BEFORE PRODUCTION
      //window.location.href=`https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/updateDB`
      //window.location.href=`${API_URL}updateDB`

      console.log(JSON.stringify(values.access_token))
      console.log(JSON.stringify(values.code))

   if (values.code)
        {
          console.log("We are inside of else if (values.code)")
          //console.log("parsed_token =", sessionStorage.getItem("parsed_token"))
          axios({
            method: 'post',
            url: 'https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid',
            headers: {
              //"Access-Control-Allow-Headers": "Content-Type, Accept",
              "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers",
    //!!      "Access-Control-Request-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers",
			        "Content-Type": "application/x-www-form-urlencoded, application/json",
            //  "Access-Control-Allow-Origin": "*",
          //    'Access-Control-Allow-Headers': 'Content-Type',
              
              'Access-Control-Request-Methods': 'OPTIONS,POST,GET',         
          //    'Authorization': `Basic ${values.access_token}`
          //    'Authorization': `Bearer ${sessionStorage.getItem("access_token")}`
          },
          data: {
            code          :  values.code,
            redirect_uri  : `${API_URL}access`,
            employeeID   : this.parseJwt(sessionStorage.getItem("access_token"))["urn:oid:1.2.840.113556.1.2.610"]
          }
          })
          .then (res => {
            console.log("result returned ",res)
            //window.location.href=`${API_URL}updateDB`
            const response = {
              statusCode: 200,
              headers: {
               //   "Access-Control-Allow-Headers": "Content-Type, Accept",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                  "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"
              },
              body: JSON.stringify('Hello from Lambda!') 
            }
            window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/updateDB`            
          }) 

    //  This is not currently working properly. This is the last thing I worked on as of 7-14-2021
    //  if (sessionStorage.getItem("success") && sessionStorage.getItem("access_token_complete")){
    //  window.location.href=`${API_URL}success`  
    //  sessionStorage.setItem("success", false)
    
    //    window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}success` 
    //  }
    //    window.location.href=`${API_URL}success`
      
      } else if (values.access_token && this.state.success == false)
        {
          sessionStorage.setItem("access_token", values.access_token)
          //let parsedToken = this.parseJwt(values.access_token)
          //employeeID is here
          //console.log(parsedToken["urn:oid:1.2.840.113556.1.2.610"])
          //sessionStorage.setItem("parsed_token", parsedToken["urn:oid:1.2.840.113556.1.2.610"])
          this.setState({success: true})      
          window.location.href=`https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=${API_URL}access`
      } else {
          console.log("User denied authorization or authorization has failed. Attempting to get permission again.")
          window.location.href=`${API_URL}denied`
      } 
    }

  
  render() {
    return (
        <h1>Access</h1>
    );
  }
}

export default Access;