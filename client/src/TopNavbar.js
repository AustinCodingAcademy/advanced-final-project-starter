import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="#">MM</Link>
        </Navbar.Brand>
        { props.showNavItems ? <Navbar.Toggle /> : null }
      </Navbar.Header>
      {
        props.showNavItems ?
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
            </Nav>
            <Nav pullRight>
              <Link to="/mygames"><Navbar.Text>My Games</Navbar.Text></Link>
            </Nav>
          </Navbar.Collapse>
          : null
      }
    </Navbar>
  );
}

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool
};

export default TopNavbar;
