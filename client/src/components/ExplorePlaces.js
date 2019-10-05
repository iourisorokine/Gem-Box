import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";


class ExplorePlaces extends Component {
  state={
    filtersStyle:{display: "none"}
  }

  handleLogout = props => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      props.setUser(null);
    });
  };

  toggleFilters=()=>{
    const filtersNewStyle=(this.state.filtersStyle==={display: "none"})?{display: "block"}:{display:"none"}
    this.setState({
      filtersStyle:filtersNewStyle
    })
  }

  render() {
    return (
      <div>
        <div>
        <button onClick={this.toggleFilters}>
        Show filters
        </button>
        </div>
        <p>Map with Gems will be shown here</p>
        <p>Hello {this.props.user.username}!</p>
        <Link onClick={() => this.handleLogout(this.props)}>Logout</Link>
      </div>
    );
  }
}

export default ExplorePlaces;
