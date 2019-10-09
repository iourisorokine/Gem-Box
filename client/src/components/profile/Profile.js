import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    user: this.props.user,
    //userProfilId ---params
    userProfilId: "5d9b843efdd9bd1e03843772"
  };

  componentDidMount() {
    if (!this.state.user) {
      console.log("cop did", this.props.user.data);
      this.setState(
        {
          user: this.props.user.data
        },
        () => console.log("updated state", this.state)
      );
    }
  }

  handleFollowClick(userId) {
    console.log("called");
    axios
      .put("/api/user/updateFollower", {
        userId: userId,
        user: this.state.user
      })
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data
        });
      });
  }

  render() {
    const user = this.state.user;
    if (!user)
      return (
        <>
          <p>This is the User Profile</p>
          <p> No user!</p>
        </>
      );
    console.log("user.following", user.following);
    const isFollowing = user.following.includes(this.state.userProfilId);
    return (
      <div class="ProfilePageDetails mx-auto">
        <div>
          <h1>{user.username}</h1>
          {/* {user.username !== user.username && ( */}
          <Button
            className="follow-button"
            onClick={event =>
              this.handleFollowClick("5d9b843efdd9bd1e03843772")
            }
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          {/* )} */}
        </div>
        <div>
          <img src="{user.profilePic}" alt="" />
        </div>

        <Link to="/update-profile">
          <Button variant="contained" type="button">
            Edit your profile
          </Button>
        </Link>

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
