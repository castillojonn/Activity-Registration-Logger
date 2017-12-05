import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventItem from '../components/EventItem';

export default class NewsfeedPage extends Component {
    constructor(props) {
        super(props);
    }

    renderEvents() {
        if (this.props.loading) {
            return (
                <div class="mainBody">
                    <span>Loading...</span>
                </div>
            );
        }

        return (
            <ul>
                { this.props.events.map((ev) => {
                    return (
                        <EventItem event={ev} />
                    );
                }) }
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h3>Events</h3>
                { this.renderEvents() }
            </div>
        );
    }
}

NewsfeedPage.propTypes = {
    loading: PropTypes.bool,
    events: PropTypes.array,
};
