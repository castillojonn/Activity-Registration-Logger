import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

// import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

/**
* NOTE: We are not using the default FlowRouter and BlazeLayout for this.
*       Instead we are using react-router.
*/
const requireAuth = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};

Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
            <Route name="login" path="/login" component={ Login } />
            <Route name="signup" path="/signup" component={ Signup } />
            <Route path="*" component={ NotFound } />
            </Route>
        </Router>,
        document.getElementById('react-root')
    );
});
