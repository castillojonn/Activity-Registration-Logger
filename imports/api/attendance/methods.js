import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Attendance } from './attendance';

export const insertAttendance = new ValidatedMethod({
    name: 'Attendance.methods.insert',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) {
        const at = {
            userId: this.userId,
            eventId: eventId,
        };

        const evGoogle = Meteor.call('Events.methods.getSingle', { eventId: eventId });
        const evLocal = Attendance.findOne(at);

        if (evGoogle && !evLocal) {
            const at = {
                userId: this.userId,
                eventId: eventId,
            };

            Attendance.insert(at);
            console.log("Attendance inserted: " + at);
        }
        else {
            console.log("Attendance not inserted: " + at);
        }
    },
});

export const deleteAttendance = new ValidatedMethod({
    name: 'Attendance.methods.delete',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ userId, eventId }) {
        Attendance.remove({
            userId: this.userId,
            eventId: eventId,
        });
    },
});
