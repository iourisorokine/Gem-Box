import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../../services/api";
import { Link } from "react-router-dom";

export default class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    // usernameToProfile = (this.state.username)=>{
    //   [username]
    // };

    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully signed up
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/profile");
      }
    });
  };

  render() {
    return (
      <>
        <div className="app-wrapper">
          <div className="pageheader py-2">Signup</div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Group>
              <Form.Label htmlFor="username" className="label-title">
                Username:
              </Form.Label>
              <Form.Control
                className="input-login-signup"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password" className="label-title">
                Password:{" "}
              </Form.Label>
              <Form.Control
                className="input-login-signup"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
              />
            </Form.Group>
            {this.state.message && (
              <Alert className="opa" variant="danger">
                {this.state.message}
              </Alert>
            )}

            <a href="/update-profile" className="button-link">
              <button
                type="submit"
                className="btn loginBtn generalBtn btn-primary"
              >
                Signup
              </button>
            </a>
          </Form>
          <div className="social-login">
            <a href="http://localhost:5555/api/auth/google">
              <button className="btn socialLoginBtn generalBtn btn-primary">
                Sign in Google <i class="fab fa-google icon-padding"></i>
              </button>
            </a>
            <a href="http://localhost:5555/api/auth/facebook">
              <button className="btn socialLoginBtn generalBtn btn-primary">
                Login with Facebook <i class="fab fa-facebook"></i>
              </button>
            </a>
          </div>
        </div>
      </>
    );
  }
}
