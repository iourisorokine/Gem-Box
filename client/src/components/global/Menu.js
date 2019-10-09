import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
      <DropdownButton
        id="dropdown-basic-button"
        className="main-menu"
        title="☰">
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item href="/explore-places">Explore places</Dropdown.Item>
        {this.state.user ? (
          <>
            <Dropdown.Item href="/create-gem">Create Gem</Dropdown.Item>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item href="/login">Login</Dropdown.Item>
            <Dropdown.Item href="/signup">Signup</Dropdown.Item>
          </>
        )}
      </DropdownButton>
    );
  }
}

export default Menu;
