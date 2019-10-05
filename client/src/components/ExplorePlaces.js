import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";

class ExplorePlaces extends Component {
  handleLogout = (props) => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      props.setUser(null);
      props.history.push("/logout");
    });
  };

  render() {
    return (
      <div>
        <p>Map with Gems will be shown here, as well as menu and filters</p>
        <p>Hello {this.props.user.username}!</p>
        <Link onClick={() => this.handleLogout(this.props)}>Logout</Link>
      </div>
    );
  }
}

export default ExplorePlaces;
