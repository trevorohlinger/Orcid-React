import React, { Component } from 'react';
import queryString from 'query-string'

import axios from 'axios';

class Access extends Component {
  constructor(props) {

	super(props);
  const values = queryString.parse(window.location.search)
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
      const values = queryString.parse(window.location.search)
      console.log(JSON.stringify(values))
    if (values.access_token)
    {

      sessionStorage.setItem("access_token", values.access_token)
      let parsedToken = this.parseJwt(values.access_token)
      // employeeID is here
      console.log(parsedToken["urn:oid:1.2.840.113556.1.2.610"])
      //console.log(this.parseJwt(values.access_token))
        /*1. Extract employeeNumber from access token. --Complete
          2. Check DynamoDb using a query for employeeNumber. If it already exists skip we are done.
          3. if not continue getting the Orcid access token.
        */  
  /*  do this from lambda  
      grant permissions inside aws to post to dynamodb
          aws dynamodb put-item \
          --table Orcid-Data-Boise-State-University \
          --item parsedToken["urn:oid:1.2.840.113556.1.2.610"] \
          --condition-expression "attribute_not_exists(Id)" */

      window.location.href='https://sandbox.orcid.org/oauth/authorize?client_id=APP-RASOJQY62Z86Q8CU&response_type=code&scope=/read-limited%20/activities/update%20/person/update&redirect_uri=https://localhost:3000/access'
      
      /* const orcidCode = queryString.parse(window.location.search)
         sessionStorage.setItem("orcidCode", orcidCode)  */

    } else if (values.code)
    {
 // Need to import ajax and send this post to AWS Lambda using ajax 
  /*    $.ajax({
        url: 'https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid',
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(data) {
            //success stuff. data here is the response, not your original data
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //error handling stuff
        }
    }); */

        // POST request using axios with set headers
   /*     const article = { title: 'React POST Code to AWS Lambda' };
        const headers = { 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Access-Control-Allow-Headers' : 'Content-Type',
          'Access-Control-Allow-Methods' : 'OPTIONS,POST,GET', 
        };
        axios.post('https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid', article, { headers })
            .then(response => this.setState({ articleId: response.data.id }));

      console.log("code=",values.code) */
      window.location.href='https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid?code=' + values.code

  /*      const requestOptions = {
        method: 'POST', 
       // headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Access-Control-Allow-Headers' : 'Content-Type',
          'Access-Control-Allow-Origin'  : 'https://sandbox.orcid.org/oauth/token',
          // https://gentle-inlet-06589.herokuapp.com/https://sandbox.orcid.org/oauth/token
          'Access-Control-Allow-Methods' : 'OPTIONS,POST,GET', 
       },
        data: JSON.stringify({
           client_id: 'APP-RASOJQY62Z86Q8CU',
           client_secret : 'df79d593-8392-46ca-9f4a-2fb4cb109655',
           grant_type : 'authorization_code',
           code: values.code, 
           redirect_uri  : 'https://localhost:3000'}) 
      }; */
     /* fetch('https://sandbox.orcid.org/oauth/token', requestOptions)
          .then(response => {
            console.log('response= ',response)
          }) */
 /*          const response = await fetch('https://sandbox.orcid.org/oauth/token', requestOptions);
           const data = await response.json(); 
           this.setState({ postId: data.id }); 
    } else {
        console.log("User denied authorization or authorization has failed. Attempting to get permission again")
        window.location.href='https://localhost:3000/denied'
    } */
// 
    //sessionStorage.setItem("access_token_parsed", parseJwt(values.access_token))

    // ------------------------------------------- important -------------------------------- sessionStorage.setItem("id_token", values.id_token) 
      
    //  sessionStorage.setItem("access_token", values.access_token.employeeNumber)
    //  window.sessionStorage.getItem("access_token")
    //  console.log("access_token =",data.access_token)

	  // then save query param to local storage
	  //  sessionStorage.setItem("token", queryParams.token)
	  //  console.log("queryParams =",queryParams);
    }
  }
  render() {
    return (
        <h1>Access</h1>
    );
  }
}

export default Access;