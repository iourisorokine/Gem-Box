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
import { pushGem } from "../../services/api.js";
import Geocoder from "react-mapbox-gl-geocoder";

class CreateGem extends React.Component {
  state = {
    stage: "",
    title: "",
    description: "",
    goodToKnow: "",
    imageUrl: "",
    creator: this.props.setUser.name,
    discovery: false,
    category: "",
    visitedDate: "",
    latitude: 0,
    longitude: 0,
    locationName: "Erkelenz"
  };

  checkStatus = () => {
    const consider = [
      "title",
      "description",
      "goodToKnow",
      "visitedDate",
      "category",
      "locationName"
    ];
    for (var key in this.state) {
      if (this.state[key] === "" && consider.indexOf(key) !== -1) {
        return false;
      }
    }
    return true;
  };

  createGem = () => {
    let { ...pushObj } = this.state;
    delete pushObj.stage;
    if (pushObj.creator === "") pushObj.creator = null;
    console.log("from CreateGem", pushObj);
    pushGem(pushObj);
  };

  fetchGemInfo = (gemInfos) => {
    this.setState({ ...this.state, ...gemInfos });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {/* <GemWelcome/> */}
        {/* <SetGem createGem={this.createGem} /> */}
        {/* <CheckGem /> */}
        {/* <AddExperience
          locationname={this.state.locationname}
          fetchGemInfo={this.fetchGemInfo}
          checkStatus={this.checkStatus}
          createGem={this.createGem}
        /> */}
        {this.state.stage === "GemSuccess" ? (
          <GemSuccess />
        ) : (
          <AddExperience
            locationname={this.state.locationname}
            fetchGemInfo={this.fetchGemInfo}
            checkStatus={this.checkStatus}
            createGem={this.createGem}
          />
          // <AddDiscovery
          //   locationname={this.state.locationname}
          //   fetchGemInfo={this.fetchGemInfo}
          //   checkStatus={this.checkStatus}
          //   createGem={this.createGem}
          // />
        )}
        {/* // <AddToTrip />
        // <GemList />
        // <AddGemToTrip /> */}
      </div>
    );
  }
}

export default CreateGem;
