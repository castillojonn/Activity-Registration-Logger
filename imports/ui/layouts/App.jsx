import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '../components/Navigation';
import EventItem from '../components/EventItem';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEvents() {
        if (!this.props.loading) {
            return this.props.events.map((ev) => {
                return (
                    <EventItem
                        event={ev}
                        />
                );
            });
        }
        return (
            <li>Loading...</li>
        );
    }

    render() {
        return (
            <div>
                <Navigation />
                <h3>Inside app.jsx</h3>
                <ul>{ this.renderEvents() }</ul>
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool,
    events: PropTypes.array,
}
