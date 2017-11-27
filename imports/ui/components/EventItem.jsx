import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

//import { insertAttendance } from '../../api/attendance/methods';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    attendThisEvent() {
        const ev =  {
            eventId: this.props.event._id
        };
        // insertAttendance.call(ev, (err) => {
        //     console.warn(err);
        // });
        Meteor.call('Attendance.methods.insert', ev);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.summary }</h3>

                <button className="delete" onClick={this.attendThisEvent.bind(this)}>
                  &times;
                </button>
            </li>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
}
