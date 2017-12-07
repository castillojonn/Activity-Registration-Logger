import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AttendanceItem from '../components/AttendanceItem';

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
                { this.props.attendanceEvents.map((at) => {
                    return (
                        <AttendanceItem event={at} />
                    )
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
    attendanceEvents: PropTypes.array,
};
