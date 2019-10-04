import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import CreateProfile from "./CreateProfile";
import { Link } from "react-router-dom";

export default class TestProfile extends Component {
  state = {
    username: "",
    profilePic: "",
    score: "",
    followers: "",
    following: "",
    discovered: "",
    explored: "",
    travelInterests: ""
  };

  // componentDidMount() {
  //   const userId = this.props.match.params.id;

  //   return axios
  //     .get(`/api/users/${userId}`)
  //     .then(response => {
  // console.log(response)
  //       const {
  //         username,
  //         profilePic,
  //         score,
  //         followers,
  //         following,
  //         discovered,
  //         explored,
  //         travelInterests
  //       } = response.data;
  //       this.setSate({
  //         username,
  //         profilePic,
  //         score,
  //         followers,
  //         following,
  //         discovered,
  //         explored,
  //         travelInterests
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  render() {
    console.log(this.state.username);
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
        <div>
          <img src="{user.profilePic}" alt="Here's your image" />
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
