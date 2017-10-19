import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import methods from api
import {
    insertEvent,
} from '../../api/events/methods';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.title }</h3>
            </li>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
}
