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
                <NavItem eventKey={1} href="/newsfeed">Newsfeed</NavItem> 
                <NavItem eventKey={2} href="/calendar">Calendar</NavItem> 
                <NavItem eventKey={3} href="/attendance">Attendance</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);
