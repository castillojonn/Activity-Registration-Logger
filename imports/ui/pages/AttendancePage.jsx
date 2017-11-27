import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AttendancePage extends Component {
    constructor(props) {
        super(props);
    }

    renderAttendance() {
        if (this.props.loading) {
            return (
                <div className="container">
                    <span>Loading...</span>
                </div>
            );
        }

        return (
            <ul>
                { this.props.attendance.map((at) => {
                    return (
                        <h3>{ at.eventId }</h3>
                    );
                }) }
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h3>My Attendance</h3>
                { this.renderAttendance() }
            </div>
        );
    }
}

AttendancePage.propTypes = {
    loading: PropTypes.bool,
    attendance: PropTypes.array,
};
