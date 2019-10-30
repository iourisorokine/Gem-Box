import React, { Component } from "react";
import axios from "axios";
import "../../stylesheets/createGem.css";

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
    console.log("How many gems", this.state.gemsData);
    return (
      <div>
        <div className="pageheader">
          <h4>
            {this.state.gemsData === undefined
              ? "May be you mean one of these Gems?"
              : "Wow it's a new Discovery!"}
          </h4>
        </div>
        <div className="padding-wrapper">
          {this.state.suggestGemsData != null &&
            this.state.suggestGemsData.map((val) => (
              <div className="item-existing" key={val._id}>
                <div>
                  <p>
                    <strong>{val.title}</strong>
                  </p>
                  <p>{val.locationName}</p>
                  <hr />
                </div>

                <div>
                  <button
                    class="btn btn-primary generalBtn"
                    onClick={() => this.handleRouteExperience(val)}
                  >
                    <span>Thats it ></span>
                  </button>
                </div>
              </div>
            ))}

          <div className="item-new">
            <div>
              <button
                class="btn btn-primary generalBtn"
                onClick={this.handleRouteDiscovery}
              >
                <span>
                  Create a new Discovery!
                  <img src="https://res.cloudinary.com/dy9sawxrm/image/upload/v1570697079/gembox/icons/diamond-icon-gold_a6lkxq.png" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


