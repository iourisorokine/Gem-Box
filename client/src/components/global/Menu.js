import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../../services/api";

class Menu extends React.Component {
  state = {
    user: null
  };

  handleLogout = (props) => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      props.setUser(null);
      this.props.history.push("/logout");
    });
  };

  render() {
    console.log("Menu Props: ", this.props);
    return (
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">Home</NavDropdown.Item>
            <NavDropdown.Item href="/explore-places">Explore places</NavDropdown.Item>
            <NavDropdown.Item href="/create-gem">Create Gem</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
