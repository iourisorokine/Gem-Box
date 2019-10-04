import React, { Component } from "react";
import axios from "axios";
// import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";

export default class UpdateProfile extends Component {
  state = {
    username: "",
    profilePic: "",
    travelInterests: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  onDrop(profilePic) {
    this.setState({
      profilePic: this.state.profilePic.concat(profilePic)
    });
  }
  handleSubmit = event => {
    event.preventDefault();

    axios
      .put("/api/users", {
        username: this.state.username,
        profilePic: this.state.profilePic,
        travelInterests: this.state.travelInterests
      })
      .then(updatedUser => {
        console.log(updatedUser);
        /*  this.props.setUser(updatedUser) */
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="userName">Username: {this.state.username} </label>
        <input
          type="text"
          onChange={this.handleChange}
          // id="userName"
          // name="userName"
          value={this.state.userName}
        />
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        <label htmlFor="travelInterests">Tell us about you...</label>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="What kind of traveller are you? What's your current location? What do you love to do?"
          // name="travelInterests"
          // id="travelInterests"
          value={this.state.travelInterests}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}
