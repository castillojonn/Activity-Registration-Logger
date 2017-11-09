import { Meteor } from 'meteor/meteor';

// deny all updates to users' profiles
Meteor.users.deny({ update: () => true });
