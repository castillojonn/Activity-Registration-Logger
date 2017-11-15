import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {
        google: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.readonly'
        ],
    },
    forceApprovalPrompt: {
        google: true
    },
});
