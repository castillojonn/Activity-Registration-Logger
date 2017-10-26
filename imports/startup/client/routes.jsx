import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer';
import NewsfeedPageContainer from '../../ui/containers/NewsfeedPageContainer';
import { Index } from '../../ui/components/Index';

export const renderRoutes = () => (
    <Router history={ browserHistory }>
        <Route path="/" component={ AppContainer }>
            <IndexRoute component={ Index } />
            <Route path="newsfeed" component={ NewsfeedPageContainer } />
        </Route>
    </Router>
    
);
