/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Events } from '../events';

Meteor.publishComposite('events.all', function allEvents(params) {
    new SimpleSchema({
        eventId: { type: String },
    }).validate(params);

    const { eventId } = params;

    return {
        find() {
            const query = {
                _id: eventId,
            };

            // We only need the _id field in this query, since it's only
            // used to drive the child queries to get the todos
            const options = {
                fields: { _id: 1 },
            };

            return Events.find(query, options);
        }
    };
});
