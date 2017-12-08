import React from 'react';
import { IndexLink, Link } from 'react-router';

import { Button, Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

export const Navigation = () => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/newsfeed">Activity Registration Logger</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <a href="/newsfeed">Newsfeed</a> | 
                <a href="/calendar">Calendar</a> | 
                <a href="/attendance">Attendance</a>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);
