import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

import "../../stylesheets/updateProfile.css";

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

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target);
    const files = event.target.profilePic.files[0];
    const uploadData = new FormData();
    uploadData.append("profilePic", files);
    axios
      .post("/api/user/add-image", uploadData)
      .then(response => {
        this.setState(
          {
            profilePic: response.data.secure_url
          },
          () => {
            console.log("Profile pic updated", this.state.profilePic);
          }
        );
        axios
          .patch("/api/user/update", {
            username: this.state.username,
            profilePic: this.state.profilePic,
            travelInterests: this.state.travelInterests
          })
          .then(response => {
            this.props.setUser(response.data);
            this.props.history.push(`/profile/${this.props.user._id}`);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        axios
          .patch("/api/user/update", {
            username: this.state.username,
            profilePic: this.state.profilePic,
            travelInterests: this.state.travelInterests
          })
          .then(response => {
            this.props.setUser(response.data);
            console.log("newUser set call component");
            this.props.history.push(`/profile/${this.props.user._id}`);
          })
          .catch(err => {
            console.log(err);
            this.props.history.push();
          });
      });
  };

  directProfile = () => {
    this.props.history.push(`/profile/${this.props.user._id}`);
  };

  render() {
    return (
      <>
        <div className="pageheader">Update your profile</div>
        <div className="wrapper-update page-wrapper-narrow">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Group>
              <h2>Hello {this.props.user.username}</h2>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="username" className="label-title">
                Change your username:
              </Form.Label>
              <Form.Control
                className="input-login-signup"
                onChange={this.handleChange}
                placeholder={this.props.user.username}
                type="text"
                name="username"
                id="username"
                value={this.state.username}
              />
            </Form.Group>
            <Form.Group className="image-uploader">
              <Form.Label htmlFor="profilePic">Update your Picture</Form.Label>

              <Form.Control id="profilePic" type="file" name="profilePic" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="travelInterests" className="label-title">
                Tell us something about you:
              </Form.Label>
              <Form.Control
                className="input-login-signup"
                onChange={this.handleChange}
                id="travelInterests"
                name="travelInterests"
                value={this.state.travelInterests}
                placeholder={this.props.user.travelInterests}
              />
            </Form.Group>

            <div className="update-btn-row1">
              <div className="col-12">
                <button
                  className="btn loginBtn generalBtn btn-primary"
                  type="submit">
                  Save
                </button>
              </div>
            </div>
            <div className="update-btn-row1">
              <div className="col-12">
                <button
                  className="btn loginBtn generalBtn btn-primary"
                  onClick={this.directProfile}
                  variant="contained"
                  type="button">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            {/* <div className="update-btn-row1">
              <div className="col-12">
              <a
                  className="btn loginBtn generalBtn btn-primary"
                  href="/profile"
                  role="button"
                >
                  See your profile
                </a>
              </div>
            </div> */}
          </Form>
        </div>
      </>
    );
  }
}
