import React, { Component } from "react";
import axios from "axios";

export default class SuggestGem extends Component {
  state = {
    suggestGemsData: null
  };

  getGemsData = () => {
    axios.get("/api/gem").then((gems) => {
      console.log(gems.data);
      console.log(this.props.locationName);
      let newdata = gems.data.filter((gem) => {
        let count = 0;
        this.props.locationName.split(",").forEach((element) => {
          if (gem.locationName.indexOf(element) !== -1) {
            count++;
            console.log(count);
          }
        });
        if (count >= 2) return true;
      });
      console.log(newdata);
      this.setState({
        suggestGemsData: newdata
      });
    });
  };

  handleRouteExperience = (val) => {
    console.log("Experience called");
    console.log(val);
    this.props.fetchGemInfo({
      latitude: val.latitude,
      longitude: val.longitude,
      locationName: val.locationName,
      discovery: false
    });
    this.props.setStage("AddExperience");
  };

  handleRouteDiscovery = () => {
    console.log("Discovery called");
    this.props.fetchGemInfo({
      discovery: true
    });
    this.props.setStage("AddDiscovery");
  };

  componentDidMount = () => {
    if (!this.state.gemsData) this.getGemsData();
  };
  render() {
    console.log(this.state.gemsData);
    return (
      <div>
        <h4 className="headingSetGem">May be you mean one of these Gems?</h4>
        {this.state.suggestGemsData != null &&
          this.state.suggestGemsData.map((val) => (
            <div className="item" key={val._id}>
              <div>
                <p>{val.title}</p>
                <p>{val.locationName}</p>
              </div>
              <div>
                <button onClick={() => this.handleRouteExperience(val)}>
                  That's it
                </button>
              </div>
            </div>
          ))}

        <div className="item">
          <div>
            <p>None it's a new Discovery!</p>
            <p>Take current location</p>
          </div>
          <div>
            <button onClick={this.handleRouteDiscovery}>That's it</button>
          </div>
        </div>
        <button>Add Details &#129130;</button>
      </div>
    );
  }
}
