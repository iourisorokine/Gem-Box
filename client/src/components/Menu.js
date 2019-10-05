import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../services/api";

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

  componentDidMount = () => {
    this.setState({
      user: this.props.user
    });
  };

  render() {
    console.log("Menu Props: ", this.props);
    return (
      <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">Home</NavDropdown.Item>
            <NavDropdown.Item href="/explore-places">
              Explore places
            </NavDropdown.Item>
            {this.props.user ? (
              <>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <Link onClick={() => this.handleLogout(this.props)}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
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
