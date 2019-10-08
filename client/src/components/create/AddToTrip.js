import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { requestTrips } from "../../services/api";

export default class AddToTrip extends Component {
  state = {
    formStatus: false,
    trips: []
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
        this.setState({ trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showTrips = () => {
    return this.state.trips.map((element) => {
      return (
        <Button
          className="btn-options"
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
        <h1>Which Trip you want to add the Gem?</h1>
        <Button onClick={this.toogleForm}>Create a new Trip</Button>
        {this.state.formStatus ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Trip Name: </Form.Label>
              <Form.Control
                required
                onChange={this.handleChanges}
                type="text"
                name="name"
                id="name"
                value={this.props.title}
              />
            </Form.Group>
            <Button type="submit">Create Trip</Button>
          </Form>
        ) : (
          <div></div>
        )}
        <div className="triplist">{this.showTrips()}</div>
      </div>
    );
  }
}
