import React, { Component } from "react";
import ShowProfile from "./ShowProfile";
import UpdateProfile from "./UpdateProfile";
import Button from "@material-ui/core/Button";
// import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    ShowProfile: true,
    user: this.props.user,
    userProfilId: "5d9b843efdd9bd1e03843772"
  };

  changeComponent = () => {
    this.setState({
      ShowProfile: !this.state.ShowProfile
    });
  };

  setUser = (user) => {
    console.log("State bevore user update", this.state);
    this.setState({
      user: user,
      ShowProfile: !this.state.ShowProfile
    });
    console.log("State after user update", this.state);
  };

  // For Follow Button
  // handleFollowClick(userId) {
  //   console.log("called");
  //   axios
  //     .put("/api/user/updateFollower", {
  //       userId: userId,
  //       user: this.state.user
  //     })
  //     .then(response => {
  //       console.log(response);
  //       this.setState({
  //         user: response.data
  //       });
  //     });
  // }

  componentDidMount() {}

  render() {
    return (
      <div className="ProfilePageDetails mx-auto">
        <div>
          <h1>{user.username}</h1>
          {user.username !== user.username && (
            <Button
              className="btn btn-primary btn-primary:hover btn-landingpage follow-button"
              onClick={event => this.handleFollowClick(user._id)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <img src="{user.profilePic}" alt="" />
        </div>

        <Link to="/update-profile">
          <Button variant="contained" type="button">
            Edit your profile
          </Button>
        </Link>