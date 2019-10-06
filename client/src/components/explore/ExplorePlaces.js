import React, { Component } from "react";
import { logout } from "../../services/api";
import Filters from "./Filters";
import MapGems from "./MapGems";
import axios from "axios";
import SetGem from "../create/SetGem";

class ExplorePlaces extends Component {
  state = {
    displayFilters: false,
    gemsData: null,
    filterStatus: {
      showGems: true,
      showTrips: true,
      userFilter: "all",
      dateStart: "",
      dateEnd: "",
      foodDrinks: true,
      cultureArts: true,
      sports: true,
      party: true,
      hikes: true,
      nature: true,
      other: true
    }
  };

  getGemsData = () => {
    axios.get("/api/gem").then((gems) => {
      console.log(gems.data);
      this.setState({
        gemsData: gems.data
      });
    });
  };

  componentDidMount=()=>{
    if(!this.state.gemsData) this.getGemsData();
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      filterStatus: { ...this.state.filterStatus, [name]: value }
    });
  };

  handleLogout = (props) => {
    console.log("LOGOUT PROPS: ", props);
    logout().then(() => {
      props.setUser(null);
      props.history.push("/logout");
    });
  };

  toggleFilters = () => {
    const displayFilters = this.state.displayFilters ? false : true;
    this.setState({
      displayFilters
    });
  };

  handleFilterSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    this.setState({
      displayFilters: false
    });
    this.getGemsData();
  };

  render() {
    let gemsFiltered = [];
    if (this.state.gemsData) {
      const gemsToFilter = this.state.gemsData;
      gemsFiltered = gemsToFilter.filter((gem) => {
        return this.state.filterStatus[gem.category] === true;
      });
    }
    console.log(this.state);
    return (
      <div >
        <div>
          <button onClick={this.toggleFilters}>Show filters</button>
          {this.state.displayFilters && (
            <>
              <Filters
                style={{position:"fixed"}}
                handleFilterChange={this.handleChange}
                handleFilterSubmit={this.handleFilterSubmit}
                filterStatus={this.state.filterStatus}
              />
            </>
          )}
          <MapGems gems={gemsFiltered}/>
        </div>
      </div>
    );
  }
}

export default ExplorePlaces;
