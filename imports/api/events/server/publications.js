import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';

import { CALENDAR_ID } from '../../../startup/server/globals';

Meteor.publish('events', function () {
    var self = this;
    var publishedKeys = {};

    try {
        const _user = Meteor.users.findOne(this.userId);

        if (_user && _user.services && _user.services.google) {
            var options = {};
            options.headers = {};
            options.headers.Authorization = 'Bearer ' + _user.services.google.accessToken;
        } else {
            throw new Exception("User's google access token not found");
        }

        var options = {
            'headers' : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _user.services.google.accessToken,
                'X-JavaScript-User-Agent': "Google APIs Explorer"
            }
        };

        var url = 'https://www.googleapis.com/calendar/v3/calendars/'+ CALENDAR_ID +'/events';
        var response = HTTP.get(url, options);

        _.each(response.data.items, function(item) {
            if (publishedKeys[item.id]) {
                self.changed('events', item.id, item);
            } else {
                publishedKeys[item.id] = true;
                self.added('events', item.id, item);
            }
        });

        self.ready();

    } catch (error) {
        console.log(error);
    }
});
