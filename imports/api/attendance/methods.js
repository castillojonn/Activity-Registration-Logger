import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Attendance } from './attendance';
import { getSingleEvent } from '../attendance/methods';

export const insertAttendance = new ValidatedMethod({
    name: 'Attendance.methods.insert',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) { 
        const ev = getSingleEvent.call(eventId);
        if (ev) {
            const at = {
                userId: this.userId,
                eventId: eventId,
            };
            Attendance.insert(at);
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
