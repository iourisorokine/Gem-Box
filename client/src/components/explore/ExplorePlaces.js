import React, { Component } from "react";
import Filters from "./Filters";
import MapGems from "./MapGems";
import axios from "axios";
import { Button } from "react-bootstrap";

const userFilterOptions = [
  { value: "all", label: "All" },
  { value: "liked", label: "Liked" },
  { value: "mine", label: "Mine" }
];

class ExplorePlaces extends Component {
  state = {
    displayFilters: false,
    gemsData: null,
    gemsToDisplay: null,
    gemSelectedInfo: null,
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
      others: true
    }
  };

  getGemsData = () => {
    axios.get("/api/gem").then(gems => {
      console.log(gems.data);
      this.setState({
        gemsData: gems.data,
        gemsToDisplay: gems.data
      });
    });
  };

  filterGems = event => {
    event.preventDefault();
    const filter = this.state.filterStatus;
    axios.get("/api/gem").then(foundGems => {
      let gemsFiltered = foundGems.data.filter(gem => {
        return (
          filter.showGems &&
          (filter.userFilter.value === "all" ||
            (filter.userFilter.value === "liked" &&
              gem.likes.includes(this.props.user._id)) ||
            (filter.userFilter.value === "mine" &&
              gem.creator === this.props.user._id)) &&
          filter[gem.category] === true &&
          filter.dateStart <= gem.created_at.slice(0, 10) &&
          gem.created_at.slice(0, 10) <= filter.dateEnd
        );
      });

      this.setState({
        gemsData: foundGems.data,
        gemsToDisplay: gemsFiltered,
        displayFilters: false,
        gemSelectedInfo: null
      });
    });
  };

  componentDidMount = () => {
    if (!this.state.gemsData) this.getGemsData();
  };

  handleSelectChange = userFilter => {
    this.setState({
      filterStatus: { ...this.state.filterStatus, userFilter: userFilter }
    });
    console.log(`Option selected:`, userFilter);
  };

  handleChange = event => {
    console.log(event.target);
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

  render() {

    if (!this.state.gemsToDisplay) return <></>;
    return (
      <div>
        <div className="explore-places page-wrapper">
          <div className="explore-places-map">
            {this.state.displayFilters && (
              <>
                <Filters
                  handleFilterChange={this.handleChange}
                  handleSelectChange={this.handleSelectChange}
                  handleFilterSubmit={this.filterGems}
                  userFilterOptions={userFilterOptions}
                  filterStatus={this.state.filterStatus}
                />
              </>
            )}
            <MapGems
              toggleFilters={this.toggleFilters}
              gems={this.state.gemsToDisplay}
              user={this.props.user}
              gemSelectedInfo={this.state.gemSelectedInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ExplorePlaces;
