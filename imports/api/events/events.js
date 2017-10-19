import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Events = new Mongo.Collection('events');

// define schema
Events.schema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
    },
});
Events.attachSchema(Events.schema);

// expose public fields
// we can hide fields here that we want to keep secret to server
Events.publicFields = {
  title: 1,
};
