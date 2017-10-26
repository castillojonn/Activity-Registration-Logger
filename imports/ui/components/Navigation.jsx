import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
    /* Container to prevent an error.

        --- Navbar and navigation
            Using Bootstraps built in Navbar. Functionality can be
            added like normal.
    */
    <div>   
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <a class="navbar-brand" href="/">Activity Registration Logger</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/newsfeed">Newsfeed<span class="sr-only">(current)</span></a>
                    <p></p>
                    <a class="nav-item nav-link" href="#">Calendar</a>
                </div>
            </div>
        </nav>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    </div>
    
    /**<ul>
        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/newsfeed">Newsfeed</Link></li>
    </ul>**/
)
