
/* This is both a backend and frontend page. It let's you specify all of the different
  URLs for the single-page web app. */

/* Import all other pages so that this router page has access to it.
  If you do not import all other pages this file may have issues working with those pages.
  */
import './App.css';
import React from "react";
import Login from './components/Login';
import Access from './components/Access';
import Access2 from './components/Access2';
import Denied from './components/Denied';
import Success from './components/Success';

// Template code for using the react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}  from "react-router-dom";

/*Our first use of an environment variable - this should be set in a local .env file
 and set to be ignored inside of the .git file. */
const ENV_LINK = process.env.REACT_APP_ENV_LINK;

//create your list of links using the router here.

export default function App() {
  return (
// Add in links to the other sections of the single-page web app here.
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              {/* Linebreak for better spacing */}
              <Link to="/"><href><br/></href></Link>
            </li> 
            <li>
            {/* <Link to="/logon">logon</Link> */}
            <strong><u>
            <a href={`${ENV_LINK}/logon`}>
              Click here to create or connect your ORCID iD </a></u></strong>
            </li>
            {/* Linebreak for better spacing */}
            <href><br/></href>
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
