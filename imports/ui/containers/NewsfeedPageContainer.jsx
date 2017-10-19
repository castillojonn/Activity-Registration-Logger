import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/events/events';
import NewsfeedPage from '../pages/NewsfeedPage';

export default withTracker(() => {
    const eventsHandle = Meteor.subscribe('events.all');
    return {
        loading: !eventsHandle.ready(),
        events: Events.find({}).fetch(),
    };
})(NewsfeedPage);
