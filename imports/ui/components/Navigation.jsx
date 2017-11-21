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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
	    <a class="navbar-brand" href="/">Activity Registration Logger</a>
 	    {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                 <Glyphicon glyph="menu-up"></Glyphicon>

        </button>*/}
            {/*<div class="collapse navbar-collapse" id="navbarNavAltMarkup">*/}

                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/newsfeed">Newsfeed<span className="sr-only">(current)</span></a> | 
                    <a class="nav-item nav-link" href="/calendar"> Calendar</a>
                </div>
            {/*</div>*/}

        </nav>
    </div>

)
