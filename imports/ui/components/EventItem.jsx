import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class EventItem extends Component {
    constructor(props) {
        super(props);
    }

    attendThisEvent() {
        const ev =  {
            eventId: this.props.event._id
        };

        Meteor.call('Attendance.methods.insert', ev);
    }

    render() {
        return (
            <li>
                <h3>{ this.props.event.summary }</h3>
		<form>
		  <textarea id="pin" rows="1" cols="5" maxlength="4" placeholder="XXXX" />
                  <h1> </h1>
		  <input type="submit" id="id" name="name" value="Submit" onClick={this.attendThisEvent.bind(this)} />
		</form>
            </li>

 	//<button className="delete" onClick={this.attendThisEvent.bind(this)}>
          //&times;
        //</button>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object,
}
