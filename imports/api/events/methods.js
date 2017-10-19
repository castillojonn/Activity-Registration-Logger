import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Events } from './events';

export const insertEvent = new ValidatedMethod({
    name: 'events.insert',
    
    validate: new SimpleSchema({
        title: { type: String },
    }).validator(),

    run({ title }) {
        const ev = {
            title: title
        };
        Events.insert(ev);
    }
});
