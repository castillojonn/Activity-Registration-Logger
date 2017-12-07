import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class AttendanceItem extends Component {
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

AttendanceItem.propTypes = {
    event: PropTypes.object,
}
