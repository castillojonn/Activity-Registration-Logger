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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
	    <a className="navbar-brand" href="/">Activity Registration Logger</a>
 	    {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                 <Glyphicon glyph="menu-up"></Glyphicon>

        </button>*/}
            {/*<div className="collapse navbar-collapse" id="navbarNavAltMarkup">*/}

                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/newsfeed">Newsfeed<span className="sr-only">(current)</span></a> |
                    <a className="nav-item nav-link" href="/calendar"> Calendar</a> |
                    <a className="nav-item nav-link" href="/attendance"> Attendance</a>
                </div>
            {/*</div>*/}

        </nav>
    </div>

)
