import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default class AddGemToTrip extends Component {
  state = {
    availableGems: [],
    message: "",
    showTripButton: false
  };

  saveTrip = () => {
    this.setState({
      message: "Your changes have successfully been saved",
      showTripButton: true
    });
    this.props.saveGemsInTrip();
    setTimeout(() => {
      this.setState({
        message: ""
      });
    }, 3000);
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
            <button
              className="btn btn-primary generalBtn btn-select"
              onClick={() => this.props.updateGemStatus(element._id)}
            >
              <p> {element.title}</p>
              <p className="action-status">
                Click to <strong>remove</strong>
              </p>
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button
              class="btn btn-primary generalBtn-disabled btn-select"
              onClick={() => {
                this.props.updateGemStatus(element._id);
              }}
            >
              <p>{element.title}</p>
              <p className="action-status">
                Click to <strong>add</strong>
              </p>
            </button>
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
    console.log("All TRIP INFOS HERE", this.props.TripInfos);
    return (
      <div>
        <div className="pageheader">
          <h4>Which Gems do you want to add to {this.props.tripName}</h4>
        </div>
        <div className="padding-wrapper trip-flex">
          <div className="gemlist">{this.showGems()}</div>
          {this.state.message && (
            <div className="successMessage">
              <p>{this.state.message}</p>
            </div>
          )}
          <button
            class="btn btn-primary generalBtn savetrip"
            onClick={this.saveTrip}
          >
            Save Gem to Trip
          </button>
          {this.state.showTripButton ? (
            <a href={`/trip/${this.props.TripInfos.selectedTrip}`}>
              <button class="btn btn-primary generalBtn savetrip">
                View Gem
              </button>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
