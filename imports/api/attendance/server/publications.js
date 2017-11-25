import { Meteor } from 'meteor/meteor';
import { Attendance } from '../attendance';

Meteor.publish('user.attendance', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Attendance.find({
        userId: this.userId,
    });
});
