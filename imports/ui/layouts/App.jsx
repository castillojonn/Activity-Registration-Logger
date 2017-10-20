import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '../components/Navigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation />
                { this.props.children }
            </div>
        );
    }
}

App.propTypes = { }
