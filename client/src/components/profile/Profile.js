import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

export default class Profile extends Component {
  state = {
    user: this.props.user,
    // popularGems: []
    //userProfilId ---params
    userProfilId: "5d9b843efdd9bd1e03843772"
  };

  componentDidMount() {
    // console.log(this.props.user);
    if (!this.state.user) {
      console.log("cop did", this.props.user.data);
      this.setState(
        {
          user: this.props.user.data
        },
        () => console.log("updated state", this.state)
      );
    }
    this.getPopularGems();
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

  getPopularGems = () => {
    axios.get(`/api/user/${this.props.user._id}`).then(gems => {
      console.log(gems.data);
      this.setState({
        popularGems: gems.data
      });
    });
  };

  displayPopularGems = () => {
    return (
      <Carousel>
        {this.state.popularGems.map(gem => (
          <Carousel.Item key={gem._id}>
            <img
              className="d-block w-100"
              style={{ height: "40vh", objectFit: "cover" }}
              src={gem.imageUrl}
              alt="gem"
            />
            <Carousel.Caption>
              <h3 style={{ fontWeight: 900 }}>{gem.title}</h3>
              <p style={{ fontWeight: 500 }}>{gem.locationName}</p>
              <a
                className="btn btn-primary btn-primary:hover btn-landingpage generalBtn"
                href={`/gem/${gem._id}`}
              >
                Explore
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  render() {
    console.log(this.state.popularGems);
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
          {this.displayPopularGems()}
        </div>
        <h2>Trips</h2>
        {/* <Link to={}>Trips</Link> */}
      </div>
    );
  }
}
