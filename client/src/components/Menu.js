import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../services/api";

class Menu extends React.Component {
  state = {
    user: null
  };

  handleLogout = props => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      props.setUser(null);
      this.props.history.push("/");
    });
  };

  componentDidMount = () => {
    this.setState({
      user: this.props.user
    });
  };

  render() {
    console.log("Menu Props: ", this.props);
    return (
      <Navbar bg="light" expand="lg">
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              <Link to="/">Home</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
            <Link to="/">Explore places</Link>
            </NavDropdown.Item>
            {this.props.user ? (
              <>
                <NavDropdown.Item href="#action/3.4">
                  <Link to="/Profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Logout
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item href="#action/3.3">
                  <Link to="/login">Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  <Link to="/signup">Signup</Link>
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    );
  }
}

export default Menu;
