import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from './components/Login';
import Access from './components/Access';
import Access2 from './components/Access2';
import Denied from './components/Denied';
import Success from './components/Success';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}  from "react-router-dom";

//create router here instead of going straight to login.

export default function App() {
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li> 
            <li>
            {/* <Link to="/logon">logon</Link> */}
            <strong><u>
            {/* <a href="https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/logon">Click here to create or connect your ORCID iD</a></u></strong> */}
            <a href="https://weblogin.boisestate.edu/adfs/oauth2/authorize?client_id=700cb295-52f1-4ea6-8d5f-a48166209ed6&response_type=code&redirect_uri=https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/callback&scope=openid">Click here to create or connect your ORCID iD</a></u></strong>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route 
            path="/logon" 
            render={props => (
              <Login {...props}/>
            )}
          />
          <Route path="/access">
            <Access /> 
          </Route>
          <Route path="/access2">
            <Access2 /> 
          </Route>
          <Route path="/denied">
            <Denied />
          </Route> 
          <Route path="/success">
            <Success /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
