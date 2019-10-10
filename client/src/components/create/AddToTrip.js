import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { requestTrips } from "../../services/api";

export default class AddToTrip extends Component {
  state = {
    formStatus: false,
    trips: [],
    successMessage: ""
  };

  handleChanges = (event) => {
    const { name, value } = event.target;
    this.props.fetchTripInfos({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createTrip();
    requestTrips(this.props.creatorid)
      .then((trips) => {
        this.setState({ trips, successMessage: "Your Trip has been created" });
        setTimeout(() => {
          this.setState({
            successMessage: ""
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showTrips = () => {
    return this.state.trips.map((element) => {
      return (
        <Button
          className="btn btn-primary generalBtn btn-select"
          onClick={() =>
            this.props.selectTrip(
              element._id,
              element.name,
              element.gemsVisited
            )
          }
        >
          {element.name}
        </Button>
      );
    });
  };

  toogleForm = () => {
    this.setState({
      formStatus: !this.state.formStatus
    });
  };

  componentDidMount = () => {
    requestTrips(this.props.creatorid)
      .then((trips) => {
        this.setState({ trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="pageheader">
          <h4> To which Trip you want to add the Gem?</h4>
        </div>
        <div className="padding-wrapper trip-flex">
          <Button
            className="btn btn-primary generalBtn btntrip"
            onClick={this.toogleForm}
          >
            Create a new Trip >
          </Button>
          {this.state.formStatus ? (
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="name">Trip Name </Form.Label>
                <Form.Control
                  required
                  onChange={this.handleChanges}
                  type="text"
                  name="name"
                  id="name"
                  value={this.props.title}
                />
              </Form.Group>
              {this.state.successMessage && (
                <div className="successMessage">
                  <p>{this.state.successMessage}</p>
                </div>
              )}
              <Button className="btn btn-primary generalBtn" type="submit">
                Create Trip
              </Button>
            </Form>
          ) : (
            <div></div>
          )}
          {this.state.trips.length > 0 ? (
            <div className="triplist">
              <h3>Choose an existing Trip</h3>
              {this.showTrips()}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
