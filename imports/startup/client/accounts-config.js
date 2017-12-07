import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {
        google: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets'
        ],
    },
    forceApprovalPrompt: {
        google: true
    },
});
