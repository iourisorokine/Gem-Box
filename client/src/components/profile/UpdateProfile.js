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
        <Form.Group>
          <h2>Hello {this.props.user.username}</h2>
        </Form.Group>
        <FormControl onSubmit={this.handleSubmit}>
          <Form.Group>
            <InputLabel htmlFor="username input-with-icon-adornment">
              Change your username:
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              onChange={this.handleChange}
              placeholder={this.props.user.username}
              // id="userName"
              name="username"
              value={this.state.username}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="travelInterests"></Form.Label>
            <TextField
              id="outlined-multiline-static"
              label="Tell us about you"
              multiline
              rows="4"
              defaultValue="Test"
              placeholder={this.props.user.travelInterests}
              // className={classes.textField}
              // margin="normal"
              variant="outlined"
            />
            {/* <Form.Control
              type="text"
              onChange={this.handleChange}
              placeholder={this.props.user.travelInterests}
              name="travelInterests"
              // id="travelInterests"
              value={this.state.travelInterests}
            /> */}
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              variant="contained"
              size="small"
              margin="theme.spacing(1)"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Form.Group>

          <Form.Group>
            <Link to="/profile">
              <Button variant="contained" type="button">
                View your profile
              </Button>
            </Link>
          </Form.Group>
          <Form.Group>
            <Link to="/explore-places">
              <Button variant="contained" type="button">
                Explore places
              </Button>
            </Link>
          </Form.Group>
        </FormControl>
      </>
    );
  }
}
