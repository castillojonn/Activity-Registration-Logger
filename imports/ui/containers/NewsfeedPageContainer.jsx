import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
//import { Events } from '../../api/events/events';
import NewsfeedPage from '../pages/NewsfeedPage';

const Events = new Mongo.Collection('events');

export default withTracker(() => {
    const eventsHandle = Meteor.subscribe('google.events');
    return {
        loading: !eventsHandle.ready(),
        events: Events.find({}).fetch(),
    };
})(NewsfeedPage);
