import React, { Component } from "react";
import axios from "axios";
export default class SuggestGem extends Component {
  state = {
    suggestGemsData: null
  };
  getGemsData = () => {
    axios.get("/api/gem").then(gems => {
      console.log(gems.data);
      console.log(this.props.locationname);
      let newdata = gems.data.filter(gem => {
        let count = 0;
        this.props.locationname.split(",").forEach(element => {
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

  handleRouteExperience = val => {
    console.log(val);
    this.props.suggestGem({
      latitude: val.latitude,
      longitude: val.longitude,
      locationName: val.locationName,
      stage: "AddExperience"
    });
  };

  handleRouteDiscovery = () => {
    this.props.suggestGem({
      stage: "AddDiscovery"
    });
  };
  componentDidMount = () => {
    if (!this.state.gemsData) this.getGemsData();
  };
  render() {
    console.log(this.state.gemsData);
    return (
      <div>
        <h1>May be you mean one of these Gems?</h1>
        <div className="SuggestGem">
          {this.state.suggestGemsData != null &&
            this.state.suggestGemsData.map(val => (
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
        </div>
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
