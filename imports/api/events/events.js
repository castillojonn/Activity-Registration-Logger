import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Events = new Mongo.Collection('events');

// deny client-side updates, all updates handled through methods
Events.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

// define schema
Events.schema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
    },
    startDateTime: {
        type: Date,
    },
    endDateTime: {
        type: Date,
    },
});
Events.attachSchema(Events.schema);

// expose public fields
// we can hide fields here that we want to keep secret to server
Events.publicFields = {
    title: 1,
    startDateTime: 1,
    endDateTime: 1,
};
