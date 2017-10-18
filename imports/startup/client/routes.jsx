import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';

Meteor.startup( () => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute name="index" component={ Index } />
            </Route>
        </Router>,
        document.getElementById('react-root')
    );
});
