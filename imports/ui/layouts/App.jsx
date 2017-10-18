import React from 'react';
import PropTypes from 'prop-types';

import { Navigation } from '../components/Navigation';
import { Events } from '../../api/events/events';
import { EventItem } from '../components/EventItem';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEvents() {
        // return this.props.events.map((ev) => {
        //     return (
        //         <EventItem
        //             event={ev}
        //             />
        //     );
        // });
        return (
            <li>first</li>
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
    events: PropTypes.array.isRequired,
}
