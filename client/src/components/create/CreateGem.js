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
import GemList from "./GemList"
import AddGemToTrip from "./AddGemToTrip"

import Geocoder from "react-mapbox-gl-geocoder";

class CreateGem extends Component {
  render(){
    return(
      <div>
        <h3>This is the Create Gem Section</h3>
        <GemWelcome/>
        <SetGem/>
        <CheckGem/>
        <AddExperience/>
        <AddDiscovery/>
        <GemSuccess/>
        <AddToTrip/>
        <GemList/>
        <AddGemToTrip/>
      </div>
    )
  }
}

export default CreateGem;
