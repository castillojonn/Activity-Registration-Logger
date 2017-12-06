import { Meteor } from 'meteor/meteor';

// deny all updates to users' profiles
Meteor.users.deny({ update: () => true });

// automatically configure google login
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "1001900628086-kfnvd4q0amdk9koetdcfd3fe7qd9ncki.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "Tu_5D5lR1urWscBWiEF8_J71"
});
