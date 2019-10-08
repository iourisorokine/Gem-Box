import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";

import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export default class GemSuccess extends React.Component {
  handleRoute = (event) => {
    switch (event.target.name) {
      case "view":
        this.props.history.push(`/gem/${this.props.gemId}`);
        break;
      case "share":
        break;
      case "add":
        this.props.setStage("AddToTrip");
        break;
      case "map":
        this.props.history.push("/explore-places");
        break;
    }

    // componentDidMount = () => {
    //   let shareUrl = `http://localhost:3000/gem/${this.props.gemId}`;
    // };
  };

  render() {
    let shareUrl = `https://localhost:3000/gem/${this.props.gemId}`;
    console.log(shareUrl);
    console.log({ ...this.props });
    return (
      <div>
        <h1>Your gem has successfully been created! Wuhuuu!</h1>
        <div className="success-flex-column">
          <h4>Share your newest Discovery:</h4>
          <div className="sharing-box">
            <div>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
            <div>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
            </div>
            <div>
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
            </div>
          </div>

          <Button onClick={this.handleRoute} name="view">
            View Gem
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
