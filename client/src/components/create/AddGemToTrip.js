import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default class AddGemToTrip extends Component {
  state = {
    availableGems: []
  };

  showGems = () => {
    let GemsInTripIncluded = [];

    if (this.props.TripInfos.existingGems !== undefined) {
      GemsInTripIncluded = this.props.TripInfos.existingGems;
    }
    console.log("Check here after click", this.props.TripInfos.existingGems);
    return this.props.TripInfos.allGems.map((element) => {
      if (GemsInTripIncluded.includes(element._id)) {
        return (
          <div>
            <Button
              className="btn-options gem-active"
              onClick={() => this.props.updateGemStatus(element._id)}
            >
              {element.title} Is already in Trip
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button
              className="btn-options gem-inactive"
              onClick={() => {
                this.props.updateGemStatus(element._id);
              }}
            >
              {element.title} not included.
            </Button>
          </div>
        );
      }
    });
  };

  componentDidMount = () => {
    console.log(
      "Did Mount and have Tripinfo props",
      this.props.TripInfos.existingGems
    );
  };

  render() {
    console.log(
      "All gem Information stored",
      this.props.TripInfos.existingGems
    );
    return (
      <div>
        <h1>Which Gems do you want to add to {this.props.tripName}</h1>
        <div className="gemlist">{this.showGems()}</div>
        <Button onClick={this.props.saveGemsInTrip}>Save Gem to Trip</Button>
      </div>
    );
  }
}
