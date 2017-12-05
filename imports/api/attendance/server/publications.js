import { Meteor } from 'meteor/meteor';
import { Attendance } from '../attendance';

Meteor.publish('user.attendance', function () {
    var self = this;
    var publishedEventIds = {};

    if (!this.userId) {
        return this.ready();
    }

    const userAttendance = Attendance.find({
        userId: this.userId,
    }, {
        fields: Attendance.publicFields,
    });

    // For each event that the user is attending,
    // get event from Google API
    var userEvents = [];
    userAttendance.forEach(function (at) {
        const eventId = at.eventId;
        const ev = Meteor.call('Events.methods.getSingle', { eventId: eventId });

        if (ev) {
            if (publishedEventIds[eventId]) {
                self.changed('attendance.events', eventId, ev);
            } else {
                publishedEventIds[eventId] = true;
                self.added('attendance.events', eventId, ev);
            }
        }
    });

    self.ready();
});
