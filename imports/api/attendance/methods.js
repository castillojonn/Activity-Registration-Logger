import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Attendance } from './attendance';


export const insertAttendance = new ValidatedMethod({
    name: 'Attendance.methods.insert',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ eventId }) {
        console.log('Attempting To insert attendance');
        const at = {
            userId: this.userId,
            eventId: eventId,
        };

        const evGoogle = Meteor.call('Events.methods.getSingle', { eventId: eventId });
        const evLocal = Attendance.findOne(at);

        if (evGoogle && !evLocal) {
            const at = {
                userId: this.userId,
                eventId: eventId,
            };

            Attendance.insert(at);
            console.log("Attendance inserted: " + at);
        }
        else {
            console.log("Attendance not inserted: " + at);
        }
    },
});

export const exportToGoogleSheet = new ValidatedMethod({
    name: 'Attendance.methods.exportToGoogleSheet',

    validate: new SimpleSchema({
        eventId: {type: String },
    }).validator(),

    run({ eventId }) {
        const at = {
            userId: this.userId,
            eventId: eventId,
        };

        try {
            //Need to use the service account's credentials to output
            const _user = Meteor.users.findOne(this.userId);

            if (_user && _user.services && _user.services.google) {
                var options = {};
                options.headers = {};
                options.headers.Authorization = 'Bearer ' + _user.services.google.accessToken;
            } else {
                throw new Exception("User's google access token not found");
            }


            var options = {
                'data' : {
                    'values' : [['UserId', this.userId],['EventId', eventId]]
                },

                'headers' : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _user.services.google.accessToken,
                    'X-JavaScript-User-Agent': "Google APIs Explorer"
                }

                
            };

            console.log(options);

            var sheet_id = '1Vn0pArZ18ZuTck-RczNW0-nRNssf5V_87VdjjOHDMKc';
            var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheet_id + '/values/Sheet1!A:A:append?valueInputOption=RAW';
            var response = HTTP.call('POST', url, options);


            if (response.data.error) {
                throw new Exception('Error outputting to sheet, sheet does not exist');
            } else {
                return response.data;
            }

        } catch (error) {
            console.log(error);
        }
    }
});

export const deleteAttendance = new ValidatedMethod({
    name: 'Attendance.methods.delete',

    validate: new SimpleSchema({
        eventId: { type: String },
    }).validator(),

    run({ userId, eventId }) {
        Attendance.remove({
            userId: this.userId,
            eventId: eventId,
        });
    },
});
