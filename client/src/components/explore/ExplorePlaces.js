import React, { Component } from "react";
import Filters from "./Filters";
import MapGems from "./MapGems";
import axios from "axios";
import {Button} from "react-bootstrap";

class ExplorePlaces extends Component {
  state = {
    displayFilters: false,
    gemsData: null,
    filterStatus: {
      showGems: true,
      showTrips: true,
      userFilter: "all",
      dateStart: "2019-01-01",
      dateEnd: "2019-12-31",
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
      const filter=this.state.filterStatus;
      gemsFiltered = gemsToFilter.filter((gem) => {
        return filter[gem.category] === true&&filter.dateStart<=gem.created_at.slice(0,10)&&gem.created_at.slice(0,10)<=filter.dateEnd;
      });
    }
    return (
      <div >
        <div>
          <Button onClick={this.toggleFilters}>Show filters</Button>
          {this.state.displayFilters && (
            <>
              <Filters
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
