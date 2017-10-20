import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.title }</h3>
                <p><strong>Start:</strong> { this.props.event.startDateTime.toString() }</p>
                <p><strong>End:</strong> { this.props.event.endDateTime.toString() }</p>
            </li>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
}
