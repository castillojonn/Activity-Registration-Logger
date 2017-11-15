import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import NewsfeedPage from '../pages/NewsfeedPage';

const Events = new Mongo.Collection('events');

export default withTracker(() => {
    const eventsHandle = Meteor.subscribe('events');
    return {
        loading: !eventsHandle.ready(),
        events: Events.find({}).fetch(),
    };
})(NewsfeedPage);
