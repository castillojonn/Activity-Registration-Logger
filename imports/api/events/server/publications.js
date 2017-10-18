/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';

import { Events } from '../events';

Meteor.publish('events.all', function allEvents() {
    Events.find({});
});
