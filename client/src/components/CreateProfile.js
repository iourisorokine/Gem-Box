import React, { Component } from "react";
import axios from "axios";
// import { Form, Button } from "react-bootstrap";

export default class CreateProfile extends Component {
  state = {
    userName: "",
    profilePic: "",
    travelInterests: ""
  };

  render() {
    return (
      <></>
      // <Form onSubmit={this.handleSubmit}>
      //   <Form.Group>
      //     <Form.Label htmlFor="userName">Username: </Form.Label>
      //     <Form.Control
      //       type="text"
      //       onChange={this.handleChange}
      //       id="userName"
      //       name="userName"
      //       value={this.state.userName}
      //     />
      //   </Form.Group>

      //   <Form.Group>
      //     <Form.Label htmlFor="travelInterests">
      //       Tell us about you...
      //     </Form.Label>
      //     <Form.Control
      //       onChange={this.handleChange}
      //       type="text"
      //       placeholder="What kind of traveller are you? What's your current location? What do you love to do?"
      //       name="travelInterests"
      //       id="travelInterests"
      //       value={this.state.travelInterests}
      //     />
      //   </Form.Group>
      // </Form>

      /* </>; */
    );
  }
}
