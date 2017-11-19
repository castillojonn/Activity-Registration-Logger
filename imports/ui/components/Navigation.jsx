import React from 'react';
import { IndexLink, Link } from 'react-router';
import BS from 'bootstrap';

/* const navbarInstance = (
  <BS.Navbar>
    <BS.Navbar.Header>
      <BS.Navbar.Brand>
        <a href="/">Activity Registration Logger</a>
      </BS.Navbar.Brand>
    </BS.Navbar.Header>
    <BS.Nav>
      <BS.NavItem eventKey={1} href="/newsfeed">Newsfeed</BS.NavItem>
      <BS.NavItem eventKey={2} href="#">Calendar</BS.NavItem>
    </BS.Nav>
  </BS.Navbar>
);

ReactDOM.render(navbarInstance, mountNode);*/

import { Button, Navbar, Glyphicon } from 'react-bootstrap';

export const Navigation = () => (
    /* Container to prevent an error.

        --- Navbar and navigation
            Using Bootstraps built in Navbar. Functionality can be
            added like normal.
    */
    <div>
        <p></p>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
	    <a class="navbar-brand" href="/">Activity Registration Logger</a>
	    <p></p>
 	    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                 <Glyphicon glyph="menu-up"></Glyphicon>

	    </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/newsfeed">Newsfeed<span className="sr-only">(current)</span></a>
                    <p></p>
                    <a class="nav-item nav-link" href="#">Calendar</a>
                </div>
            </div>
        </nav>
    </div>

    /**<ul>
        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/newsfeed">Newsfeed</Link></li>**/
)
