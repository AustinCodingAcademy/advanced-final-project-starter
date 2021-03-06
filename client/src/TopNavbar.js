import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
 
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
        </Nav>
        <Nav pullRight>
          <Link to="/secret"><Navbar.Text>Secret</Navbar.Text></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool.isRequired
};

export default TopNavbar;
