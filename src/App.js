import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from './components/Login';
import Access from './components/Access';
import Denied from './components/Denied';
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
            <a href="https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/logon">logon</a>
            </li>
            <li>
            {/* <Link to="Orcid"></Link> */}
            <a href="https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/orcid">orcid</a>
            </li>
            <li>
            {/* <Link to="Denied"></Link> Remove this link in final version*/}
            <a href="https://spm35eaceb.execute-api.us-west-2.amazonaws.com/dev/denied">denied</a>
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
          <Route path="/denied">
            <Denied /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
