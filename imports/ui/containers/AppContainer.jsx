import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events/events';
import App from '../layouts/App';

export default withTracker(() => {
    const eventsHandle = Meteor.subscribe('events.all');
    return {
        //user: Meteor.user(),
        loading: !eventsHandle.ready(),
        events: Events.find({}).fetch(),
    };
})(App);
