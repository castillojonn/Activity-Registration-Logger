var require = meteorInstall({"imports":{"api":{"attendance":{"server":{"publications.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/attendance/server/publications.js                                                                //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
let Meteor;
module.watch(require("meteor/meteor"), {
    Meteor(v) {
        Meteor = v;
    }

}, 0);
let Attendance;
module.watch(require("../attendance"), {
    Attendance(v) {
        Attendance = v;
    }

}, 1);
Meteor.publish('user.attendance', function () {
    if (!this.userId) {
        return this.ready();
    }

    return Attendance.find({
        userId: this.userId
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"attendance.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/attendance/attendance.js                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({
    Attendance: () => Attendance
});
let Mongo;
module.watch(require("meteor/mongo"), {
    Mongo(v) {
        Mongo = v;
    }

}, 0);
let SimpleSchema;
module.watch(require("meteor/aldeed:simple-schema"), {
    SimpleSchema(v) {
        SimpleSchema = v;
    }

}, 1);
const Attendance = new Mongo.Collection('attendance');
// deny client side updates
Attendance.deny({
    insert() {
        return true;
    },

    update() {
        return true;
    },

    remove() {
        return true;
    }

}); // schema

Attendance.schema = new SimpleSchema({
    userId: {
        type: String
    },
    eventId: {
        type: String
    }
});
Attendance.attachSchema(Attendance.schema); // expose public fields
// ** sh 112117 - maybe this shouldn't be public ??

Attendance.publicFields = {
    userId: 1,
    eventId: 1
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/attendance/methods.js                                                                            //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({
    insertAttendance: () => insertAttendance,
    deleteAttendance: () => deleteAttendance
});
let Meteor;
module.watch(require("meteor/meteor"), {
    Meteor(v) {
        Meteor = v;
    }

}, 0);
let ValidatedMethod;
module.watch(require("meteor/mdg:validated-method"), {
    ValidatedMethod(v) {
        ValidatedMethod = v;
    }

}, 1);
let Attendance;
module.watch(require("./attendance"), {
    Attendance(v) {
        Attendance = v;
    }

}, 2);
let getSingleEvent;
module.watch(require("../attendance/methods"), {
    getSingleEvent(v) {
        getSingleEvent = v;
    }

}, 3);
const insertAttendance = new ValidatedMethod({
    name: 'Attendance.methods.insert',
    validate: new SimpleSchema({
        eventId: {
            type: String
        }
    }).validator(),

    run({
        eventId
    }) {
        const ev = getSingleEvent.call(eventId);

        if (ev) {
            const at = {
                userId: this.userId,
                eventId: eventId
            };
            Attendance.insert(at);
        }
    }

});
const deleteAttendance = new ValidatedMethod({
    name: 'Attendance.methods.delete',
    validate: new SimpleSchema({
        eventId: {
            type: String
        }
    }).validator(),

    run({
        userId,
        eventId
    }) {
        Attendance.remove({
            userId: this.userId,
            eventId: eventId
        });
    }

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"events":{"server":{"publications.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/events/server/publications.js                                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
let Meteor;
module.watch(require("meteor/meteor"), {
    Meteor(v) {
        Meteor = v;
    }

}, 0);

let _;

module.watch(require("meteor/underscore"), {
    _(v) {
        _ = v;
    }

}, 1);
let HTTP;
module.watch(require("meteor/http"), {
    HTTP(v) {
        HTTP = v;
    }

}, 2);
let CALENDAR_ID;
module.watch(require("../../../startup/server/globals"), {
    CALENDAR_ID(v) {
        CALENDAR_ID = v;
    }

}, 3);
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
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _user.services.google.accessToken,
                'X-JavaScript-User-Agent': "Google APIs Explorer"
            }
        };
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + CALENDAR_ID + '/events';
        var response = HTTP.get(url, options);

        _.each(response.data.items, function (item) {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/events/methods.js                                                                                //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({
    getSingleEvent: () => getSingleEvent
});
let Meteor;
module.watch(require("meteor/meteor"), {
    Meteor(v) {
        Meteor = v;
    }

}, 0);
let ValidatedMethod;
module.watch(require("meteor/mdg:validated-method"), {
    ValidatedMethod(v) {
        ValidatedMethod = v;
    }

}, 1);
let CALENDAR_ID;
module.watch(require("../../startup/server/globals"), {
    CALENDAR_ID(v) {
        CALENDAR_ID = v;
    }

}, 2);
const getSingleEvent = new ValidatedMethod({
    name: 'Events.methods.getSingle',
    validate: new SimpleSchema({
        eventId: {
            type: String
        }
    }).validator(),

    run({
        eventId
    }) {
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
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _user.services.google.accessToken,
                    'X-JavaScript-User-Agent': "Google APIs Explorer"
                }
            };
            var url = 'https://www.googleapis.com/calendar/v3/calendars/' + CALENDAR_ID + '/events/' + eventId;
            var response = HTTP.get(url, options);

            if (response.data.error) {
                throw new Exception('Error calling for event, event does not exist');
            } else {
                return respone.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"fixtures.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/server/fixtures.js                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"globals.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/server/globals.js                                                                            //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({
  CALENDAR_ID: () => CALENDAR_ID
});
const CALENDAR_ID = 'capstone.reg.log@gmail.com';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/server/index.js                                                                              //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.watch(require("./register-api"));
module.watch(require("./fixtures"));
module.watch(require("./security"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"register-api.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/server/register-api.js                                                                       //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.watch(require("../../api/events/methods"));
module.watch(require("../../api/events/server/publications"));
module.watch(require("../../api/attendance/methods"));
module.watch(require("../../api/attendance/server/publications"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"security.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/server/security.js                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
// deny all updates to users' profiles
Meteor.users.deny({
  update: () => true
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// server/main.js                                                                                               //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.watch(require("/imports/startup/server"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvYXR0ZW5kYW5jZS9zZXJ2ZXIvcHVibGljYXRpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9hdHRlbmRhbmNlL2F0dGVuZGFuY2UuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2F0dGVuZGFuY2UvbWV0aG9kcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvZXZlbnRzL3NlcnZlci9wdWJsaWNhdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2V2ZW50cy9tZXRob2RzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL2dsb2JhbHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvcmVnaXN0ZXItYXBpLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL3NlY3VyaXR5LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJtb2R1bGUiLCJ3YXRjaCIsInJlcXVpcmUiLCJ2IiwiQXR0ZW5kYW5jZSIsInB1Ymxpc2giLCJ1c2VySWQiLCJyZWFkeSIsImZpbmQiLCJleHBvcnQiLCJNb25nbyIsIlNpbXBsZVNjaGVtYSIsIkNvbGxlY3Rpb24iLCJkZW55IiwiaW5zZXJ0IiwidXBkYXRlIiwicmVtb3ZlIiwic2NoZW1hIiwidHlwZSIsIlN0cmluZyIsImV2ZW50SWQiLCJhdHRhY2hTY2hlbWEiLCJwdWJsaWNGaWVsZHMiLCJpbnNlcnRBdHRlbmRhbmNlIiwiZGVsZXRlQXR0ZW5kYW5jZSIsIlZhbGlkYXRlZE1ldGhvZCIsImdldFNpbmdsZUV2ZW50IiwibmFtZSIsInZhbGlkYXRlIiwidmFsaWRhdG9yIiwicnVuIiwiZXYiLCJjYWxsIiwiYXQiLCJfIiwiSFRUUCIsIkNBTEVOREFSX0lEIiwic2VsZiIsInB1Ymxpc2hlZEtleXMiLCJfdXNlciIsInVzZXJzIiwiZmluZE9uZSIsInNlcnZpY2VzIiwiZ29vZ2xlIiwib3B0aW9ucyIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYWNjZXNzVG9rZW4iLCJFeGNlcHRpb24iLCJ1cmwiLCJyZXNwb25zZSIsImdldCIsImVhY2giLCJkYXRhIiwiaXRlbXMiLCJpdGVtIiwiaWQiLCJjaGFuZ2VkIiwiYWRkZWQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE1BQUo7QUFBV0MsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDSCxXQUFPSSxDQUFQLEVBQVM7QUFBQ0osaUJBQU9JLENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7QUFBK0QsSUFBSUMsVUFBSjtBQUFlSixPQUFPQyxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNFLGVBQVdELENBQVgsRUFBYTtBQUFDQyxxQkFBV0QsQ0FBWDtBQUFhOztBQUE1QixDQUF0QyxFQUFvRSxDQUFwRTtBQUd6RkosT0FBT00sT0FBUCxDQUFlLGlCQUFmLEVBQWtDLFlBQVk7QUFDMUMsUUFBSSxDQUFDLEtBQUtDLE1BQVYsRUFBa0I7QUFDZCxlQUFPLEtBQUtDLEtBQUwsRUFBUDtBQUNIOztBQUVELFdBQU9ILFdBQVdJLElBQVgsQ0FBZ0I7QUFDbkJGLGdCQUFRLEtBQUtBO0FBRE0sS0FBaEIsQ0FBUDtBQUdILENBUkQsRTs7Ozs7Ozs7Ozs7QUNIQU4sT0FBT1MsTUFBUCxDQUFjO0FBQUNMLGdCQUFXLE1BQUlBO0FBQWhCLENBQWQ7QUFBMkMsSUFBSU0sS0FBSjtBQUFVVixPQUFPQyxLQUFQLENBQWFDLFFBQVEsY0FBUixDQUFiLEVBQXFDO0FBQUNRLFVBQU1QLENBQU4sRUFBUTtBQUFD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O0FDQXRLLElBQUlILE1BQUo7QUFBV0MsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDSCxTQUFPSSxDQUFQLEVBQVM7QUFBQ0osYUFBT0ksQ0FBUDtBQUFTOztBQUFwQixDQUF0QyxFQUE0RCxDQUE1RDtBQUVYO0FBQ0FKLE9BQU95QyxLQUFQLENBQWEzQixJQUFiLENBQWtCO0FBQUVFLFVBQVEsTUFBTTtBQUFoQixDQUFsQixFOzs7Ozs7Ozs7OztBQ0hBZixPQUFPQyxLQUFQLENBQWFDLFFBQVEseUJBQVIsQ0FBYixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IEF0dGVuZGFuY2UgfSBmcm9tICcuLi9hdHRlbmRhbmNlJztcblxuTWV0ZW9yLnB1Ymxpc2goJ3VzZXIuYXR0ZW5kYW5jZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudXNlcklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEF0dGVuZGFuY2UuZmluZCh7XG4gICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgfSk7XG59KTtcbiIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbmltcG9ydCB7IFNpbXBsZVNjaGVtYSB9IGZyb20gJ21ldGVvci9hbGRlZWQ6c2ltcGxlLXNjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBBdHRlbmRhbmNlID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2F0dGVuZGFuY2UnKTtcblxuLy8gZGVueSBjbGllbnQgc2lkZSB1cGRhdGVzXG5BdHRlbmRhbmNlLmRlbnkoe1xuICBpbnNlcnQoKSB7IHJldHVybiB0cnVlOyB9LFxuICB1cGRhdGUoKSB7IHJldHVybiB0cnVlOyB9LFxuICByZW1vdmUoKSB7IHJldHVybiB0cnVlOyB9LFxufSk7XG5cbi8vIHNjaGVtYVxuQXR0ZW5kYW5jZS5zY2hlbWEgPSBuZXcgU2ltcGxlU2NoZW1hKHtcbiAgICB1c2VySWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgIH0sXG4gICAgZXZlbnRJZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbn0pO1xuQXR0ZW5kYW5jZS5hdHRhY2hTY2hlbWEoQXR0ZW5kYW5jZS5zY2hlbWEpO1xuXG4vLyBleHBvc2UgcHVibGljIGZpZWxkc1xuLy8gKiogc2ggMTEyMTE3IC0gbWF5YmUgdGhpcyBzaG91bGRuJ3QgYmUgcHVibGljID8/XG5BdHRlbmRhbmNlLnB1YmxpY0ZpZWxkcyA9IHtcbiAgICB1c2VySWQ6IDEsXG4gICAgZXZlbnRJZDogMSxcbn07XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IFZhbGlkYXRlZE1ldGhvZCB9IGZyb20gJ21ldGVvci9tZGc6dmFsaWRhdGVkLW1ldGhvZCc7XG5cbmltcG9ydCB7IEF0dGVuZGFuY2UgfSBmcm9tICcuL2F0dGVuZGFuY2UnO1xuaW1wb3J0IHsgZ2V0U2luZ2xlRXZlbnQgfSBmcm9tICcuLi9hdHRlbmRhbmNlL21ldGhvZHMnO1xuXG5leHBvcnQgY29uc3QgaW5zZXJ0QXR0ZW5kYW5jZSA9IG5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6ICdBdHRlbmRhbmNlLm1ldGhvZHMuaW5zZXJ0JyxcblxuICAgIHZhbGlkYXRlOiBuZXcgU2ltcGxlU2NoZW1hKHtcbiAgICAgICAgZXZlbnRJZDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICB9KS52YWxpZGF0b3IoKSxcblxuICAgIHJ1bih7IGV2ZW50SWQgfSkgeyBcbiAgICAgICAgY29uc3QgZXYgPSBnZXRTaW5nbGVFdmVudC5jYWxsKGV2ZW50SWQpO1xuICAgICAgICBpZiAoZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0ID0ge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgICAgZXZlbnRJZDogZXZlbnRJZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBBdHRlbmRhbmNlLmluc2VydChhdCk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVBdHRlbmRhbmNlID0gbmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ0F0dGVuZGFuY2UubWV0aG9kcy5kZWxldGUnLFxuXG4gICAgdmFsaWRhdGU6IG5ldyBTaW1wbGVTY2hlbWEoe1xuICAgICAgICBldmVudElkOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIH0pLnZhbGlkYXRvcigpLFxuXG4gICAgcnVuKHsgdXNlcklkLCBldmVudElkIH0pIHtcbiAgICAgICAgQXR0ZW5kYW5jZS5yZW1vdmUoe1xuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICAgIGV2ZW50SWQ6IGV2ZW50SWQsXG4gICAgICAgIH0pO1xuICAgIH0sXG59KTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgXyB9IGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcbmltcG9ydCB7IEhUVFAgfSBmcm9tICdtZXRlb3IvaHR0cCc7XG5cbmltcG9ydCB7IENBTEVOREFSX0lEIH0gZnJvbSAnLi4vLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvZ2xvYmFscyc7XG5cbk1ldGVvci5wdWJsaXNoKCdldmVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwdWJsaXNoZWRLZXlzID0ge307XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBfdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcblxuICAgICAgICBpZiAoX3VzZXIgJiYgX3VzZXIuc2VydmljZXMgJiYgX3VzZXIuc2VydmljZXMuZ29vZ2xlKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0ge307XG4gICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIF91c2VyLnNlcnZpY2VzLmdvb2dsZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJVc2VyJ3MgZ29vZ2xlIGFjY2VzcyB0b2tlbiBub3QgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgX3VzZXIuc2VydmljZXMuZ29vZ2xlLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdYLUphdmFTY3JpcHQtVXNlci1BZ2VudCc6IFwiR29vZ2xlIEFQSXMgRXhwbG9yZXJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vY2FsZW5kYXIvdjMvY2FsZW5kYXJzLycrIENBTEVOREFSX0lEICsnL2V2ZW50cyc7XG4gICAgICAgIHZhciByZXNwb25zZSA9IEhUVFAuZ2V0KHVybCwgb3B0aW9ucyk7XG5cbiAgICAgICAgXy5lYWNoKHJlc3BvbnNlLmRhdGEuaXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChwdWJsaXNoZWRLZXlzW2l0ZW0uaWRdKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VkKCdldmVudHMnLCBpdGVtLmlkLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHVibGlzaGVkS2V5c1tpdGVtLmlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRlZCgnZXZlbnRzJywgaXRlbS5pZCwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucmVhZHkoKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59KTtcbiIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgVmFsaWRhdGVkTWV0aG9kIH0gZnJvbSAnbWV0ZW9yL21kZzp2YWxpZGF0ZWQtbWV0aG9kJztcblxuaW1wb3J0IHsgQ0FMRU5EQVJfSUQgfSBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9nbG9iYWxzJztcblxuZXhwb3J0IGNvbnN0IGdldFNpbmdsZUV2ZW50ID0gbmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ0V2ZW50cy5tZXRob2RzLmdldFNpbmdsZScsXG5cbiAgICB2YWxpZGF0ZTogbmV3IFNpbXBsZVNjaGVtYSh7XG4gICAgICAgIGV2ZW50SWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgfSkudmFsaWRhdG9yKCksXG5cbiAgICBydW4oeyBldmVudElkIH0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IF91c2VyID0gTWV0ZW9yLnVzZXJzLmZpbmRPbmUodGhpcy51c2VySWQpO1xuXG4gICAgICAgICAgICBpZiAoX3VzZXIgJiYgX3VzZXIuc2VydmljZXMgJiYgX3VzZXIuc2VydmljZXMuZ29vZ2xlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIF91c2VyLnNlcnZpY2VzLmdvb2dsZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlVzZXIncyBnb29nbGUgYWNjZXNzIHRva2VuIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgJ2hlYWRlcnMnIDoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIF91c2VyLnNlcnZpY2VzLmdvb2dsZS5hY2Nlc3NUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgJ1gtSmF2YVNjcmlwdC1Vc2VyLUFnZW50JzogXCJHb29nbGUgQVBJcyBFeHBsb3JlclwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHVybCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9jYWxlbmRhci92My9jYWxlbmRhcnMvJysgQ0FMRU5EQVJfSUQgKycvZXZlbnRzLycrIGV2ZW50SWQ7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBIVFRQLmdldCh1cmwsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ0Vycm9yIGNhbGxpbmcgZm9yIGV2ZW50LCBldmVudCBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uZS5kYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iLCJleHBvcnQgY29uc3QgQ0FMRU5EQVJfSUQgPSAnY2Fwc3RvbmUucmVnLmxvZ0BnbWFpbC5jb20nO1xuIiwiLy8gZGVmaW5lIGNvbGxlY3Rpb25zLCBwdWJsaWNhdGlvbnMsIGFuZCBtZXRob2RzIHRoYXQgdGhlXG4vLyBhcHAgcHJvdmlkZXMgYXMgQVBJIHRvIGNsaWVudFxuaW1wb3J0ICcuL3JlZ2lzdGVyLWFwaSc7XG5cbi8vIGRlZmluZSBhIHN0YXJ0aW5nIHNldCBvZiBkYXRhIGlmIGFwcCBpcyBsb2FkZWQgd2l0aCBhbiBlbXB0eSBkYlxuaW1wb3J0ICcuL2ZpeHR1cmVzJztcblxuLy8gcmVnaXN0ZXIgc2VjdXJpdHlcbmltcG9ydCAnLi9zZWN1cml0eSc7XG4iLCIvLyBldmVudHNcbmltcG9ydCAnLi4vLi4vYXBpL2V2ZW50cy9tZXRob2RzJztcbmltcG9ydCAnLi4vLi4vYXBpL2V2ZW50cy9zZXJ2ZXIvcHVibGljYXRpb25zJztcblxuLy8gYXR0ZW5kYW5jZVxuaW1wb3J0ICcuLi8uLi9hcGkvYXR0ZW5kYW5jZS9tZXRob2RzJztcbmltcG9ydCAnLi4vLi4vYXBpL2F0dGVuZGFuY2Uvc2VydmVyL3B1YmxpY2F0aW9ucyc7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuLy8gZGVueSBhbGwgdXBkYXRlcyB0byB1c2VycycgcHJvZmlsZXNcbk1ldGVvci51c2Vycy5kZW55KHsgdXBkYXRlOiAoKSA9PiB0cnVlIH0pO1xuIiwiaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG4iXX0=
