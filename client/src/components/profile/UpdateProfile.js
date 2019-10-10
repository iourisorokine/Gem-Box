import React, { Component } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import ImageUploader from "react-images-upload";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SaveIcon from "@material-ui/icons/Save";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import "../../stylesheets/profile.css";

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
    console.log(this.state.username);
    return (
      <>
        {" "}
        <div className="pageheader py-2">Update yor profile</div>
        <div className="wrapper-update">
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
              <Form.Group>
                <button
                  className="btn loginBtn generalBtn btn-primary"
                  type="submit"
                >
                  Save
                </button>
              </Form.Group>
              <Form.Group>
                <button
                  className="btn loginBtn generalBtn btn-primary"
                  onClick={this.directProfile}
                  variant="contained"
                  type="button"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </Form.Group>
            </div>
            <div className="update-btn-row2">
              <Form.Group>
                <a
                  className="btn-primary btn-landingpage generalBtn-landing"
                  href="/explore-places"
                  role="button"
                >
                  Explore places
                </a>

                <a
                  className="btn-primary btn-landingpage generalBtn-landing"
                  href="/profile"
                  role="button"
                >
                  See your profile
                </a>
              </Form.Group>
            </div>
          </Form>
        </div>
      </>
    );
  }
}
