import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app';
import { Index } from '../../ui/components/index';

Meteor.startup( () => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
            </Route>
        </Router>,
        document.getElementById('react-root')
    );
});
