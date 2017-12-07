import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';

import AttendancePage from '../pages/AttendancePage';

const AttendanceEvents = new Mongo.Collection('attendance.events');

export default withTracker(() => {
    const attendanceHandle = Meteor.subscribe('user.attendance');
    return {
        loading: !attendanceHandle.ready(),
        attendanceEvents: AttendanceEvents.find({}).fetch(),
    };
})(AttendancePage);
