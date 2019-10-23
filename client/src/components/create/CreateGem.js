import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import SetGem from "./SetGem";
import SuggestGem from "./SuggestGem";
import AddDiscovery from "./AddDiscovery";
import GemSuccess from "./GemSuccess";
import AddToTrip from "./AddToTrip";
import AddGemToTrip from "./AddGemToTrip";
import {
  pushGem,
  requestTrips,
  pushTrip,
  specificGems,
  updateTrip
} from "../../services/api.js";

class CreateGem extends React.Component {
  state = {
    stage: "SetGem",
    gem: {
      title: "",
      description: "",
      goodToKnow: "",
      imageUrl: "",
      creator: this.props.user._id,
      discovery: null,
      category: "",
      visitedDate: "",
      latitude: 0,
      longitude: 0,
      locationName: "",
      gemId: null
    },
    trip: {
      tripId: null,
      name: "",
      creator: this.props.user._id,
      selectedTrip: null,
      allGems: [],
      addedGems: [],
      existingGems: []
    }
  };

  checkStatus = () => {
    console.log(this.state.gem);
    const consider = [
      "title",
      "description",
      "goodToKnow",
      "visitedDate",
      "category",
      "locationName"
    ];
    for (var key in this.state.gem) {
      if (this.state.gem[key] === "" && consider.indexOf(key) !== -1) {
        return false;
      }
    }
    return true;
  };

  createGem = () => {
    console.log("create gem with props", this.state.gem);
    let { ...pushObj } = this.state.gem;
    delete pushObj.stage;
    if (pushObj.creator === "") pushObj.creator = null;
    pushGem(pushObj).then((n) => {
      this.setState({
        gem: {
          gemId: n._id
        }
      });
    });
  };

  fetchGemInfo = (gemInfos) => {
    this.setState({ gem: { ...this.state.gem, ...gemInfos } });
  };

  createTrip = () => {
    let { ...pushObj } = this.state.trip;
    delete pushObj.stage;
    if (pushObj.creator === "") pushObj.creator = null;
    pushTrip(pushObj).then((n) => {
      this.setState({
        trip: {
          tripId: n._id
        }
      });
      console.log("created trip with state", this.state.trip);
      requestTrips(this.props.user._id);
    });
  };

  fetchTripInfo = (tripInfos) => {
    this.setState({ trip: { ...this.state.trip, ...tripInfos } });
  };

  getTrips = () => {
    requestTrips().then((n) => {
      this.setState({
        trip: {
          tripId: n._id
        }
      });
    });
  };

  selectTrip = (tripid, name, selectedGem) => {
    specificGems(this.props.user._id).then((gemArray) => {
      this.setState({
        stage: "AddGemToTrip",
        trip: {
          selectedTrip: tripid,
          allGems: gemArray,
          name: name,
          existingGems: selectedGem
        }
      });
    });
  };

  saveGemsInTrip = () => {
    let { ...pushObj } = this.state.trip;
    console.log("State Trip bevor query", this.state.trip);
    if (pushObj.creator === "") pushObj.creator = null;
    updateTrip(pushObj).then((n) => {
      console.log("Request saveGemsTrip done");
    });
  };

  updateGemStatus = (gemid, event) => {
    let addedGemcopy = [...this.state.trip.existingGems];
    if (addedGemcopy.indexOf(gemid) === -1) addedGemcopy.push(gemid);
    else addedGemcopy.splice(addedGemcopy.indexOf(gemid), 1);
    this.setState({
      trip: {
        ...this.state.trip,
        existingGems: addedGemcopy
      }
    });
  };

  setStage = (stage) => {
    this.setState({
      stage: stage
    });
  };

  changeStage = (stage) => {
    switch (stage) {
      case "SetGem":
        return (
          <SetGem fetchGemInfo={this.fetchGemInfo} setStage={this.setStage} />
        );
      case "SuggestGem":
        return (
          <SuggestGem
            locationName={this.state.gem.locationName}
            setStage={this.setStage}
            fetchGemInfo={this.fetchGemInfo}
          />
        );
      case "AddExperience":
        return (
          <AddDiscovery
            locationName={this.state.gem.locationName}
            fetchGemInfo={this.fetchGemInfo}
            setStage={this.setStage}
            checkStatus={this.checkStatus}
            createGem={this.createGem}
            discovery={false}
          />
        );
      case "AddDiscovery":
        return (
          <AddDiscovery
            locationName={this.state.gem.locationName}
            fetchGemInfo={this.fetchGemInfo}
            setStage={this.setStage}
            checkStatus={this.checkStatus}
            createGem={this.createGem}
            discovery={true}
          />
        );
      case "GemSuccess":
        return (
          <div className="padding-wrapper">
            <GemSuccess
              gemId={this.state.gem.gemId}
              setStage={this.setStage}
              {...this.props}
            />
          </div>
        );
      case "AddToTrip":
        return (
          <AddToTrip
            fetchTripInfos={this.fetchTripInfo}
            setStage={this.setStage}
            createTrip={this.createTrip}
            creatorid={this.props.user._id}
            selectTrip={this.selectTrip}
          />
        );
      // case "GemList":
      //   return <GemList />;
      case "AddGemToTrip":
        return (
          <AddGemToTrip
            TripInfos={this.state.trip}
            updateGemStatus={this.updateGemStatus}
            saveGemsInTrip={this.saveGemsInTrip}
            tripName={this.state.trip.name}
          />
        );
    }
  };
  render() {
    console.log(this.state.stage, this.state);
    return <div>{this.changeStage(this.state.stage)}</div>;
  }
}

export default CreateGem;
