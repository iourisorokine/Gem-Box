import React, { Component } from "react";
import axios from "axios";
import ReactMapGL from "react-map-gl";
import PolyLineOverlay from "./PolyLineOverlay";
import GemForTrip from "./GemForTrip";

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
    console.log("clicked")
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

    // const gemsToRender = this.props.gems.map(gem => {
    //   return (
    //       <GemOnMap key={gem._id} data={gem} openPopup={this.openPopup} />
    //   );
    // });
    let gemsToRender = [];
    console.log(this.state.tripStages)
    if (this.state.gemsData) {
      gemsToRender = this.state.gemsData.map(gem => {
        return (
            <GemForTrip key={gem._id} data={gem} addToTrip={this.addTripStage}/>
        );
      });
    }
    console.log(this.state.tripStages);
    return (
      <div>
        <h2>Route details</h2>
        <button onClick={this.getRoute}>Get route</button>
        {/* <div></div> */}
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
          {this.state.points && <PolyLineOverlay points={this.state.points} />}
          {gemsToRender}

        </ReactMapGL>
      </div>
    );
  }
}

export default TripDetails;
