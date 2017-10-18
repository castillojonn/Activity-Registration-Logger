import { React } from 'react';
import PropTypes from 'prop-types';

// import methods from api
import {
    insertEvent,
} from '../../api/events/methods';

export default class EventItem {
    constructor(props) {

    }

    render() {
        return (
            <li>
                <h3>{ this.props.title }</h3>
            </li>
        );
    }
}

EventItem.propTypes = {
    title: PropTypes.string.required,
}
