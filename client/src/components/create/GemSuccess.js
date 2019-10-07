import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default class GemSuccess extends Component {
  handleRoute = (event) => {
    switch (event.target.name) {
      case "view":
        console.log("view");
        break;
      case "share":
        break;
      case "add":
        break;
      case "map":
        break;
    }
  };

  render() {
    return (
      <div>
        <h1>Your gem has successfully been created! Wuhuuu!</h1>
        <div className="flex-column">
          <Button onClick={this.handleRoute} name="view">
            View Gem
          </Button>
          <Button onClick={this.handleRoute} name="share">
            Share your Gem
          </Button>
          <Button onClick={this.handleRoute} name="add">
            Add to a Trip
          </Button>
          <Button onClick={this.handleRoute} name="map">
            Back to Map
          </Button>
        </div>
      </div>
    );
  }
}
