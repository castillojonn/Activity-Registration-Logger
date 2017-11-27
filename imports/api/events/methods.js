import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { CALENDAR_ID } from '../../startup/server/globals';

export const getSingleEvent = new ValidatedMethod({
    name: 'Events.methods.getSingle',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) {
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

            var url = 'https://www.googleapis.com/calendar/v3/calendars/'+ CALENDAR_ID +'/events/'+ eventId;
            var response = HTTP.get(url, options);

            if (response.data.error) {
                throw new Exception('Error calling for event, event does not exist');
            } else {
                return response.data;
            }

        } catch (error) {
            console.log(error);
        }
    },
});
