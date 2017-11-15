import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.summary }</h3>
            </li>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
}
