import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Events } from '../../api/events/events';
import App from '../layouts/App';

export default withTracker(() => {
    const events = Meteor.subscribe('events.all');

    return {
        //user: Meteor.user(),
        events: Events.find({}).fetch(),
    };
})(App);
