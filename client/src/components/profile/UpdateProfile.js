import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import ImageUploader from "react-images-upload";

export default class UpdateProfile extends Component {
  state = {
    username: this.props.user.username,
    profilePic: this.props.user.profilePic,
    travelInterests: this.props.user.travelInterests
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    const { username, profilePic, travelInterests } = this.state;

    this.setState({
      [name]: value
    });
  };

  // onDrop(profilePic) {
  //   this.setState({
  //     profilePic: this.state.profilePic.concat(profilePic)
  //   });
  // }
  handleSubmit = event => {
    event.preventDefault();

    axios
      .patch("/api/user/update", {
        username: this.state.username,
        profilePic: this.state.profilePic,
        travelInterests: this.state.travelInterests
      })
      .then(response => {
        this.props.setUser(response.data);
        this.props.history.push("/profile");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.username);
    return (
      <>
        <h2>Hello {this.props.user.username}</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Change your username:</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              placeholder={this.props.user.username}
              // id="userName"
              name="username"
              value={this.state.username}
            />
          </Form.Group>
          {/* <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        /> */}
          <Form.Group>
            <Form.Label htmlFor="travelInterests">
              Tell us about you...
            </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              placeholder={this.props.user.travelInterests}
              name="travelInterests"
              // id="travelInterests"
              value={this.state.travelInterests}
            />
          </Form.Group>
          <Button type="submit">Save</Button>

          <Link to="/profile">
            <Button type="button">View your profile</Button>
          </Link>
          <Link to="/explore-places">
            <Button type="button">Explore places</Button>
          </Link>
        </Form>
      </>
    );
  }
}
