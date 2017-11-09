/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
//import { Events } from '../events';

Meteor.publish('events.all', function(subreddit) {
    var self = this;

    try {
        var response = GoogleApi.get('https://www.googleapis.com/calendar/v3/users/me/calendarList/en.usa#holiday@group.v.calendar.google.com', {});

        self.added('events', Random.id(), response.data);
        self.ready();

    } catch (error) {
        console.log(error);
    }
});
