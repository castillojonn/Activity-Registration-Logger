import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Attendance = new Mongo.Collection('attendance');

// deny client side updates
Attendance.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// schema
Attendance.schema = new SimpleSchema({
    userId: {
        type: String,
    },
    eventId: {
        type: String,
    },
});
Attendance.attachSchema(Attendance.schema);

// expose public fields
// ** sh 112117 - maybe this shouldn't be public ??
Attendance.publicFields = {
    userId: 1,
    eventId: 1,
};
