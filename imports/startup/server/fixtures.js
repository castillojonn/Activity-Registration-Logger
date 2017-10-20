import { Meteor } from 'meteor/meteor';
//import { Roles } from 'meteor/alanning:roles';
//import { Accounts } from 'meteor/accounts-base';

// if (!Meteor.isProduction) {
//     const users = [{
//         email: 'admin@admin.com',
//         password: 'password',
//         profile: {
//             name: { first: 'John', last: 'Doe' },
//         },
//         roles: ['admin'],
//     }];
//
//     users.forEach(({ email, password, profile, roles }) => {
//         const userExists = Meteor.users.findOne({ 'emails.address': email });
//
//         if (!userExists) {
//             const userId = Accounts.createUser({ email, password, profile });
//             Roles.addUsersToRoles(userId, roles);
//         }
//     });
// }

import { insertEvent } from '../../api/events/methods';

// insert mock data to db
if (!Meteor.isProduction) {
    const mockEvents = [
        {
            title: "Apple Picking",
            startDateTime: new Date(),
            endDateTime: new Date(),
        },
        {
            title: "Doctor Stuff",
            startDateTime: new Date(),
            endDateTime: new Date(),
        },
        {
            title: "Chunin Exams",
            startDateTime: new Date(),
            endDateTime: new Date(),
        }
    ];

    mockEvents.forEach(function(ev) {
        insertEvent.call(ev, (error) => {
            if (error) {
                console.log(error.reason);
            }
        });
    })
}
