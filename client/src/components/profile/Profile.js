import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (!this.state.user) {
      this.setState({
        user: this.props.user
      });
    }
  }

  render() {
    console.log("Profile user state: ", this.state);
    const user = this.state.user;
    if (!user)
      return (
        <>
          <p>This us the User Profile</p>
          <p> No user!</p>
        </>
      );
    return (
      <div class="ProfilePageDetails mx-auto">
        <div>
          <h1>{user.username}</h1>
        </div>
        <div>
          <img src="{user.profilePic}" alt="" />
        </div>
        {/* <Button to={`/edit-profile`}>Edit</Button> */}
        <div>
          <p>Score: {user.score}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
        <div>
          <p>Dicovered: {user.discovered}</p>
          <p>Explored: {user.explored}</p>
        </div>
        <div>
          <h2>About me</h2>
          <p>{user.travelInterests}</p>
        </div>
        <div>
          <h2>Most popular gems</h2>
          <p>Slider</p>
        </div>
        <h2>Trips</h2>
        {/* <Link to={}>Trips</Link> */}
      </div>
    );
  }
}
