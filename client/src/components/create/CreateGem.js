import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import SetGem from "./SetGem";
import GemWelcome from "./GemWelcome";
import SuggestGem from "./SuggestGem";
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
    stage: "SetGem",
    title: "",
    description: "",
    goodToKnow: "",
    imageUrl: "",
    creator: this.props.user._id,
    discovery: false,
    category: "",
    visitedDate: "",
    latitude: 0,
    longitude: 0,
    locationName: ""
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

  changeStage = (stage) => {
    switch (stage) {
      case "GemWelcome":
        return <GemWelcome />;
      case "SetGem":
        return <SetGem fetchGemInfo={this.fetchGemInfo} />;
      case "SuggestGem":
        return (
          <SuggestGem
            locationName={this.state.locationName}
            fetchGemInfo={this.fetchGemInfo}
          />
        );
      case "AddExperience":
        return (
          <AddExperience
            locationName={this.state.locationName}
            fetchGemInfo={this.fetchGemInfo}
            checkStatus={this.checkStatus}
            createGem={this.createGem}
          />
        );
      case "AddDiscovery":
        return (
          <AddDiscovery
            locationName={this.state.locationName}
            fetchGemInfo={this.fetchGemInfo}
            checkStatus={this.checkStatus}
            createGem={this.createGem}
          />
        );
      case "GemSuccess":
        return <GemSuccess />;
      case "AddToTrip":
        return <AddToTrip />;
      case "GemList":
        return <GemList />;
      case "AddGemToTrip":
        return <AddGemToTrip />;
    }
  };
  render() {
    console.log(this.props.user._id);
    return <div>{this.changeStage(this.state.stage)}</div>;
  }
}

export default CreateGem;
