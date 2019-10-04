import React, { Component } from "react";
import { Button } from "react-bootstrap";
import CreateProfile from "./CreateProfile";
import { Link } from "react-router-dom";
import axios from "axios";

export default class TestProfile extends Component {
  state = {
    username: "Anna",
    profilePic:
      "https://icon-library.net/images/profile-picture-icon/profile-picture-icon-0.jpg",
    score: "3",
    followers: "25",
    following: "10",
    discovered: "5",
    explored: "12",
    travelInterests:
      "I love to explore the world getting to know the different countries by discovering hidden places and local recommendations."
  };

  componentDidMount() {
    console.log(this.props);
    const userId = this.props.match.params.id;
    // const userId = "5d96fc27c908ca4711fbcc6e";
    console.log(`http://localhost:5555/api/users/${userId}`);
    axios
      .get(`http://localhost:5555/api/users/${userId}`)
      .then(response => {
        console.log(response);
        const {
          username,
          profilePic,
          score,
          followers,
          following,
          discovered,
          explored,
          travelInterests
        } = response.data;
        this.setSate({
          username,
          profilePic,
          score,
          followers,
          following,
          discovered,
          explored,
          travelInterests
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log(this.state.username);
    console.log(this.state.profilePic);
    const user = {
      username: this.state.username,
      profilePic: this.state.profilePic,
      score: this.state.score,
      followers: this.state.followers,
      following: this.state.following,
      discovered: this.state.discovered,
      explored: this.state.explored,
      travelInterests: this.state.travelInterests
    };

    return (
      <div>
        <div>
          <h1>Hello {user.username}</h1>
        </div>
        <div style={{ width: "50px" }}>
          <img
            src={user.profilePic}
            alt="Here's your image"
            style={{ width: "100%" }}
          />
        </div>
        <Link to={`/create-profile`}>
          <button type="button">Edit</button>
        </Link>
        {/* <Button to={`/create-profile`}>Edit</Button> */}
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
        <p>List of Trips</p>
        {/* <Link to={}>Trips</Link> */}
      </div>
    );
  }
}
