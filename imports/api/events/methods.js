import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Events } from './events';

export const insertEvent = new ValidatedMethod({
    name: 'events.insert',

    validate: new SimpleSchema({
        title: { type: String },
        startDateTime: { type: Date },
        endDateTime: { type: Date },
    }).validator(),

    run({ title, startDateTime, endDateTime }) {
        const ev = {
            title: title,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        };
        Events.insert(ev);
    }
});
