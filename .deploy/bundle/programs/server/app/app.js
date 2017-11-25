var require = meteorInstall({"imports":{"api":{"events":{"server":{"publications.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/api/events/server/publications.js                                                            //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        var url = 'https://www.googleapis.com/calendar/v3/calendars/capstone.reg.log@gmail.com/events';
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/api/events/methods.js                                                                        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"fixtures.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/startup/server/fixtures.js                                                                   //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/startup/server/index.js                                                                      //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
module.watch(require("./register-api"));
module.watch(require("./fixtures"));
module.watch(require("./security"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"register-api.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/startup/server/register-api.js                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
module.watch(require("../../api/events/methods"));
module.watch(require("../../api/events/server/publications"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"security.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// imports/startup/server/security.js                                                                   //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/main.js                                                                                       //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
module.watch(require("/imports/startup/server"));
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvZXZlbnRzL3NlcnZlci9wdWJsaWNhdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvcmVnaXN0ZXItYXBpLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL3NlY3VyaXR5LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJtb2R1bGUiLCJ3YXRjaCIsInJlcXVpcmUiLCJ2IiwiXyIsIkhUVFAiLCJwdWJsaXNoIiwic2VsZiIsInB1Ymxpc2hlZEtleXMiLCJfdXNlciIsInVzZXJzIiwiZmluZE9uZSIsInVzZXJJZCIsInNlcnZpY2VzIiwiZ29vZ2xlIiwib3B0aW9ucyIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYWNjZXNzVG9rZW4iLCJFeGNlcHRpb24iLCJ1cmwiLCJyZXNwb25zZSIsImdldCIsImVhY2giLCJkYXRhIiwiaXRlbXMiLCJpdGVtIiwiaWQiLCJjaGFuZ2VkIiwiYWRkZWQiLCJyZWFkeSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImRlbnkiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBSjtBQUFXQyxPQUFPQyxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNILFdBQU9JLENBQVAsRUFBUztBQUFDSixpQkFBT0ksQ0FBUDtBQUFTOztBQUFwQixDQUF0QyxFQUE0RCxDQUE1RDs7QUFBK0QsSUFBSUMsQ0FBSjs7QUFBTUosT0FBT0MsS0FBUCxDQUFhQyxRQUFRLG1CQUFSLENBQWIsRUFBMEM7QUFBQ0UsTUFBRUQsQ0FBRixFQUFJO0FBQUNDLFlBQUVELENBQUY7QUFBSTs7QUFBVixDQUExQyxFQUFzRCxDQUF0RDtBQUF5RCxJQUFJRSxJQUFKO0FBQVNMLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxhQUFSLENBQWIsRUFBb0M7QUFBQ0csU0FBS0YsQ0FBTCxFQUFPO0FBQUNFLGVBQUtGLENBQUw7QUFBTzs7QUFBaEIsQ0FBcEMsRUFBc0QsQ0FBdEQ7QUFJbEpKLE9BQU9PLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLFlBQVk7QUFDakMsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBLFFBQUk7QUFDQSxjQUFNQyxRQUFRVixPQUFPVyxLQUFQLENBQWFDLE9BQWIsQ0FBcUIsS0FBS0MsTUFBMUIsQ0FBZDs7QUFFQSxZQUFJSCxTQUFTQSxNQUFNSSxRQUFmLElBQTJCSixNQUFNSSxRQUFOLENBQWVDLE1BQTlDLEVBQXNEO0FBQ2xELGdCQUFJQyxVQUFVLEVBQWQ7QUFDQUEsb0JBQVFDLE9BQVIsR0FBa0IsRUFBbEI7QUFDQUQsb0JBQVFDLE9BQVIsQ0FBZ0JDLGFBQWhCLEdBQWdDLFlBQVlSLE1BQU1JLFFBQU4sQ0FBZUMsTUFBZixDQUFzQkksV0FBbEU7QUFDSCxTQUpELE1BSU87QUFDSCxrQkFBTSxJQUFJQyxTQUFKLENBQWMsc0NBQWQsQ0FBTjtBQUNIOztBQUVELFlBQUlKLFVBQVU7QUFDVix1QkFBWTtBQUNSLGdDQUFnQixrQkFEUjtBQUVSLGlDQUFpQixZQUFZTixNQUFNSSxRQUFOLENBQWVDLE1BQWYsQ0FBc0JJLFdBRjNDO0FBR1IsMkNBQTJCO0FBSG5CO0FBREYsU0FBZDtBQVFBLFlBQUlFLE1BQU0sb0ZBQVY7QUFDQSxZQUFJQyxXQUFXaEIsS0FBS2lCLEdBQUwsQ0FBU0YsR0FBVCxFQUFjTCxPQUFkLENBQWY7O0FBRUFYLFVBQUVtQixJQUFGLENBQU9GLFNBQVNHLElBQVQsQ0FBY0MsS0FBckIsRUFBNEIsVUFBU0MsSUFBVCxFQUFlO0FBQ3ZDLGdCQUFJbEIsY0FBY2tCLEtBQUtDLEVBQW5CLENBQUosRUFBNEI7QUFDeEJwQixxQkFBS3FCLE9BQUwsQ0FBYSxRQUFiLEVBQXVCRixLQUFLQyxFQUE1QixFQUFnQ0QsSUFBaEM7QUFDSCxhQUZELE1BRU87QUFDSGxCLDhCQUFja0IsS0FBS0MsRUFBbkIsSUFBeUIsSUFBekI7QUFDQXBCLHFCQUFLc0IsS0FBTCxDQUFXLFFBQVgsRUFBcUJILEtBQUtDLEVBQTFCLEVBQThCRCxJQUE5QjtBQUNIO0FBQ0osU0FQRDs7QUFTQW5CLGFBQUt1QixLQUFMO0FBRUgsS0FqQ0QsQ0FpQ0UsT0FBT0MsS0FBUCxFQUFjO0FBQ1pDLGdCQUFRQyxHQUFSLENBQVlGLEtBQVo7QUFDSDtBQUNKLENBeENELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQS9CLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxnQkFBUixDQUFiO0FBQXdDRixPQUFPQyxLQUFQLENBQWFDLFFBQVEsWUFBUixDQUFiO0FBQW9DRixPQUFPQyxLQUFQLENBQWFDLFFBQVEsWUFBUixDQUFiLEU7Ozs7Ozs7Ozs7O0FDQTVFRixPQUFPQyxLQUFQLENBQWFDLFFBQVEsMEJBQVIsQ0FBYjtBQUFrREYsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLHNDQUFSLENBQWIsRTs7Ozs7Ozs7Ozs7QUNBbEQsSUFBSUgsTUFBSjtBQUFXQyxPQUFPQyxLQUFQLENBQWFDLFFBQVEsZUFBUixDQUFiLEVBQXNDO0FBQUNILFNBQU9JLENBQVAsRUFBUztBQUFDSixhQUFPSSxDQUFQO0FBQVM7O0FBQXBCLENBQXRDLEVBQTRELENBQTVEO0FBRVg7QUFDQUosT0FBT1csS0FBUCxDQUFhd0IsSUFBYixDQUFrQjtBQUFFQyxVQUFRLE1BQU07QUFBaEIsQ0FBbEIsRTs7Ozs7Ozs7Ozs7QUNIQW5DLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSx5QkFBUixDQUFiLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgXyB9IGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcbmltcG9ydCB7IEhUVFAgfSBmcm9tICdtZXRlb3IvaHR0cCc7XG5cbk1ldGVvci5wdWJsaXNoKCdldmVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwdWJsaXNoZWRLZXlzID0ge307XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBfdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHRoaXMudXNlcklkKTtcblxuICAgICAgICBpZiAoX3VzZXIgJiYgX3VzZXIuc2VydmljZXMgJiYgX3VzZXIuc2VydmljZXMuZ29vZ2xlKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0ge307XG4gICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIF91c2VyLnNlcnZpY2VzLmdvb2dsZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJVc2VyJ3MgZ29vZ2xlIGFjY2VzcyB0b2tlbiBub3QgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgX3VzZXIuc2VydmljZXMuZ29vZ2xlLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdYLUphdmFTY3JpcHQtVXNlci1BZ2VudCc6IFwiR29vZ2xlIEFQSXMgRXhwbG9yZXJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vY2FsZW5kYXIvdjMvY2FsZW5kYXJzL2NhcHN0b25lLnJlZy5sb2dAZ21haWwuY29tL2V2ZW50cyc7XG4gICAgICAgIHZhciByZXNwb25zZSA9IEhUVFAuZ2V0KHVybCwgb3B0aW9ucyk7XG5cbiAgICAgICAgXy5lYWNoKHJlc3BvbnNlLmRhdGEuaXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChwdWJsaXNoZWRLZXlzW2l0ZW0uaWRdKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VkKCdldmVudHMnLCBpdGVtLmlkLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHVibGlzaGVkS2V5c1tpdGVtLmlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRlZCgnZXZlbnRzJywgaXRlbS5pZCwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYucmVhZHkoKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59KTtcbiIsIi8vIGRlZmluZSBjb2xsZWN0aW9ucywgcHVibGljYXRpb25zLCBhbmQgbWV0aG9kcyB0aGF0IHRoZVxuLy8gYXBwIHByb3ZpZGVzIGFzIEFQSSB0byBjbGllbnRcbmltcG9ydCAnLi9yZWdpc3Rlci1hcGknO1xuXG4vLyBkZWZpbmUgYSBzdGFydGluZyBzZXQgb2YgZGF0YSBpZiBhcHAgaXMgbG9hZGVkIHdpdGggYW4gZW1wdHkgZGJcbmltcG9ydCAnLi9maXh0dXJlcyc7XG5cbi8vIHJlZ2lzdGVyIHNlY3VyaXR5XG5pbXBvcnQgJy4vc2VjdXJpdHknO1xuIiwiaW1wb3J0ICcuLi8uLi9hcGkvZXZlbnRzL21ldGhvZHMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvZXZlbnRzL3NlcnZlci9wdWJsaWNhdGlvbnMnO1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5cbi8vIGRlbnkgYWxsIHVwZGF0ZXMgdG8gdXNlcnMnIHByb2ZpbGVzXG5NZXRlb3IudXNlcnMuZGVueSh7IHVwZGF0ZTogKCkgPT4gdHJ1ZSB9KTtcbiIsImltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuIl19
