import React from "react";
import { NavDropdown, DropdownButton,Navbar,Nav } from "react-bootstrap";
import { logout } from "../../services/api";

class Menu extends React.Component {
  state = {
    user: this.props.user
  };

  componentDidMount(){
    if(!this.state.user) this.props.setUser();
  }

  handleLogout = props => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      this.props.setUser(null);
      this.props.history.push("/logout");
    });
  };

  render() {
    console.log("Menu state: ", this.state);
    console.log("Menu props: ", this.props);
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">GemBox</Navbar.Brand>
      <Nav className="mr-auto">
      <NavDropdown title="☰" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/">Home</NavDropdown.Item>
        <NavDropdown.Item href="/explore-places">Explore places</NavDropdown.Item>
        {this.state.user ? (
          <>
            <NavDropdown.Item href="/create-gem">Create Gem</NavDropdown.Item>
            <NavDropdown.Item href={this.state.user?"/profile/"+this.props.user._id:"/"}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
          </>
        )}
        </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
