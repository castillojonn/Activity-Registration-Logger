import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';

const POLL_INTERVAL = 10000;
Meteor.publish('events', function () {
    const self = this;
    const publishedKeys = {};
    const poll = () => {
        try {
            const _user = Meteor.users.findOne(this.userId);

            if (_user && _user.services && _user.services.google) {
                var options = {};
                options.headers = {};
                options.headers.Authorization = 'Bearer ' + _user.services.google.accessToken;
            }
            else {
                throw new Exception("User's google access token not found");
            }

            var options = {
                'headers' : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _user.services.google.accessToken,
                    'X-JavaScript-User-Agent': "Google APIs Explorer"
                }
            };

            var url = 'https://www.googleapis.com/calendar/v3/calendars/capstone.reg.log@gmail.com/events';
            var response = HTTP.get(url, options);

            _.each(response.data.items, function(item) {
                if (publishedKeys[item._id]) {
                    self.changed('events', item._id, item);
                } else {
                    publishedKeys[item._id] = true;
                    self.added('events', item._id, item);
                }
            });

            self.ready();

        } catch (error) {
            console.log(error);
        }
    };

    // run poll every interval
    poll();
    //self.ready();

    const interval = Meteor.setInterval(poll, POLL_INTERVAL);

    self.onStop(() => {
        Meteor.clearInterval(interval);
    });
});
