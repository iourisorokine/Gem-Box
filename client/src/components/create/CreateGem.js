import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import SetGem from "./SetGem";
import GemWelcome from "./GemWelcome";
import CheckGem from "./CheckGem";
import AddExperience from "./AddExperience";
import AddDiscovery from "./AddDiscovery";
import GemSuccess from "./GemSuccess";
import AddToTrip from "./AddToTrip";
import GemList from "./GemList";
import AddGemToTrip from "./AddGemToTrip";

import Geocoder from "react-mapbox-gl-geocoder";

class CreateGem extends React.Component {
  state = {
    stage: "GemWelcome",
    title: "",
    description: "",
    goodToKnow: "",
    imageUrl: "",
    creator: "",
    discovery: false,
    category: "",
    visitedDate: "",
    latitude: 0,
    longitude: 0,
    locationname: ""
  };

  createGem = (gemInfos) => {
    this.setState({ ...this.state, ...gemInfos });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {/* <GemWelcome/> */}
        <SetGem createGem={this.createGem} />
        {/* <CheckGem/>
        <AddExperience />
        <AddDiscovery/>
        <GemSuccess/>
        <AddToTrip/>
        <GemList/>
        <AddGemToTrip/> */}
      </div>
    );
  }
}

export default CreateGem;
