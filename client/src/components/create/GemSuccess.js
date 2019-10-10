import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";
import "../../stylesheets/createGem.css";

import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export default class GemSuccess extends React.Component {
  handleRoute = event => {
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
    let shareUrl = `https://gem-box.herokuapp.com/gem/${this.props.gemId}`;
    console.log(shareUrl);
    console.log({ ...this.props });
    return (
      <>
      <div className="gem-success-header">
      <h2>Congrats! You just created a new Gem!</h2>
      </div>
      <div className="success-container">

        <div className="success-flex-share">
          <p>Share your newest Discovery:</p>
          <div className="success-flex-container">
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
        </div>
        <div>
          <div className="success-btn-container">
            <Button className="btn btn-primary generalBtn" onClick={this.handleRoute} name="view">
              View Gem  <i class="fas fa-eye"></i>
            </Button>
          </div>
          <div className="success-btn-container">
            <Button className="btn btn-primary generalBtn" onClick={this.handleRoute} name="add">
              Add to a Trip  <i class="fas fa-plus"></i>
            </Button>
          </div>
          <div className="success-btn-container">
            <Button className="btn btn-primary generalBtn" onClick={this.handleRoute} name="map">
              Back to Map  <i class="fa fa-globe" aria-hidden="true"></i>
            </Button>
          </div>
        </div>
      </div>
      </>
    );
  }
}
