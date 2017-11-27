import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AttendancePage from '../pages/AttendancePage';
import { Attendance } from '../../api/attendance/attendance';

export default withTracker(() => {
    const attendanceHandle = Meteor.subscribe('user.attendance');
    return {
        loading: !attendanceHandle.ready(),
        attendance: Attendance.find({}).fetch()
    };
})(AttendancePage);
