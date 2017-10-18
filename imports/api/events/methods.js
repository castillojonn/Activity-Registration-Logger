import { Meteor } from 'meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Events } from './events';

export const insertEvent = new ValidatedMethod({
    name: 'events.insert',
    validate: new SimpleSchema({
        title: { type: String },
        eventId: { type: String }
    }).validator(),
    run({ title, eventId }) {

        const ev = {
            eventId: eventId,
            title: title
        };

        Events.insert(ev);
    }
})
