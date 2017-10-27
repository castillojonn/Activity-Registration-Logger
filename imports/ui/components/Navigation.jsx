import React from 'react';
import { IndexLink, Link } from 'react-router';

import { Button, Navbar, Glyphicon } from 'react-bootstrap';

export const Navigation = () => (
    /* Container to prevent an error.

        --- Navbar and navigation
            Using Bootstraps built in Navbar. Functionality can be
            added like normal.
    */
    <div>
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light" >
            <a className="navbar-brand" href="/">Activity Registration Logger</a>
            <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <Glyphicon glyph="menu-up"></Glyphicon>
            </Button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/newsfeed">Newsfeed<span className="sr-only">(current)</span></a>
                    <p></p>
                    <a className="nav-item nav-link" href="#">Calendar</a>
                </div>
            </div>
        </Navbar>
    </div>

    /**<ul>
        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/newsfeed">Newsfeed</Link></li>
    </ul>**/
)
