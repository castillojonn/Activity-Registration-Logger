import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class AttendanceItem extends Component {
    constructor(props) {
        super(props);
    }

    deleteAttendance() {
        const ev = {
            eventId: this.props.event._id
        };

        Meteor.call('Attendance.methods.delete', ev);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.summary }</h3>
                <button onClick={this.deleteAttendance.bind(this)}>
                    x
                </button>
            </li>
        );
    }
}

AttendanceItem.propTypes = {
    event: PropTypes.object,
}
