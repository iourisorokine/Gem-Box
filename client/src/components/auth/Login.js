import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../../services/api";
import "../../stylesheets/login.css";

export default class Login extends Component {
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

    login(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully signed up
        // update the state for the parent component
        console.log(data);
        this.props.setUser(data);
        this.props.history.push("/explore-places");
      }
    });
  };

  render() {
    return (
      <>
        <div className="app-wrapper">
          <div className="pageheader py-2">Login</div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Group>
              <Form.Label htmlFor="username" className="label-title">
                Username:{" "}
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
              <Alert variant="danger">{this.state.message}</Alert>
            )}
            <a href="/explore-places" className="button-link">
              <button
                type="submit"
                className="btn loginBtn generalBtn btn-primary"
              >
                Login
              </button>
            </a>
          </Form>
          {/* <div className="social-login">
            <a href="http://localhost:5555/api/auth/google">
              <button className="btn socialLoginBtn generalBtn btn-primary">
                Login with Google <i class="fab fa-google icon-padding"></i>
              </button>
            </a>
            <a href="http://localhost:5555/api/auth/facebook">
              <button className="btn socialLoginBtn generalBtn btn-primary">
                Login with Facebook <i class="fab fa-facebook"></i>
              </button>
            </a>
          </div> */}
        </div>
      </>
    );
  }
}
