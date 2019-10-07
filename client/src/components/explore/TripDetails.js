import React, { Component } from "react";
import axios from "axios";
import ReactMapGL from "react-map-gl";
import PolyLineOverlay from "./PolyLineOverlay";

class TripDetails extends Component {
  state = {
    viewport: {
      width: "500px",
      height: "500px",
      latitude: 53.520008,
      longitude: 13.404954,
      zoom: 6
    },
    gemsData: null,
    tripStages: [],
    points: []
  };

  componentDidMount() {
    if (!this.state.gemsData) this.getGemsData();
  }

  getGemsData = () => {
    axios.get("/api/gem").then(gems => {
      this.setState({
        gemsData: gems.data
      });
    });
  };

  addTripStage = coord => {
    const currentStages = this.state.tripStages;
    currentStages.push(coord);
    this.setState({
      tripStages: currentStages
    });
  };

  getRoute = () => {
    const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const coordinates = this.state.tripStages.join(";");
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}.json?access_token=${mapboxApiAccessToken}`;
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        const points = response.data.waypoints.reduce(
          (acc, val) => acc.concat([val.location]),
          []
        );
        console.log(points);
        this.setState({
          points
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let gemsToRender = [];
    if (this.state.gemsData) {
      gemsToRender = this.state.gemsData.map(el => {
        const gemCoordinates =
          el.latitude.toFixed(3) + "," + el.longitude.toFixed(3);
        return (
          <div
            onClick={() => {
              this.addTripStage(gemCoordinates);
            }}>
            <h6>{el.title}</h6>
          </div>
        );
      });
    }
    console.log(this.state.tripStages);
    return (
      <div>
        <h2>Route details</h2>
        <button onClick={this.getRoute}>Get route</button>
        <div>{gemsToRender}</div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport =>
            this.setState({
              viewport: viewport
            })
          }
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          captureDoubleClick={false}
          doubleClickZoom={false}>
          {/* <PloyLine positions={[
    [-21.81884765625, 64.1297836764257],
    [-19.79736328125, 64.1585310519412]]}
  /> */}

          {this.state.points && <PolyLineOverlay points={this.state.points} />}
        </ReactMapGL>
      </div>
    );
  }
}

export default TripDetails;
