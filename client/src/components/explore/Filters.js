import React, { Component } from "react";


class Filters extends Component {
  state = {
    gemsData: null,
    filterStatus:{}
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(this.state);
  //   this.getGemsData();
  // };

  // handleChange = event => {
  //   const name = event.target.name;
  //   const value =
  //     event.target.type === "checkbox"
  //       ? event.target.checked
  //       : event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  render() {
    return (
      <div style={{border:"1px solid black"}}>
        <h1>Filter by</h1>
        <form onSubmit={this.props.handleFilterSubmit}>
          <div>
            <input
              type="checkbox"
              name="showGems"
              id="showGems"
              checked={this.props.filterStatus.showGems}
              onChange={this.props.handleFilterChange}
            />
            <label htmlFor="showGems">Gems</label>
            <br />
            <input
              type="checkbox"
              name="showTrips"
              id="showTrips"
              checked={this.props.filterStatus.showTrips}
              onChange={this.props.handleFilterChange}
            />
            <label htmlFor="showTrips">Trips</label>
          </div>
          <div>
            <label htmlFor="userFilter">Show:</label>
            <select
              id="userFilter"
              name="userFilter"
              onChange={this.props.handleFilterChange}>
              <option
                value="All"
                name="userFilter"
                onChange={this.props.handleFilterChange}>
                All
              </option>
              <option
                value="liked"
                name="userFilter"
                onChange={this.props.handleFilterChange}>
                Liked
              </option>
              <option
                value="mine"
                name="userFilter"
                onChange={this.props.handleFilterChange}>
                Mine
              </option>
            </select>
          </div>
          <div>
            <h2>Show by date</h2>
            <label htmlFor="dateStart">From:</label>
            <input
              type="date"
              id="dateStart"
              name="dateStart"
              value={this.props.filterStatus.dateStart}
              onChange={this.props.handleFilterChange}></input>
            <label htmlFor="dateStart">To:</label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              value={this.props.filterStatus.dateEnd}
              onChange={this.props.handleFilterChange}></input>
          </div>
          <h2>Categories</h2>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
              <input
                type="checkbox"
                name="foodDrinks"
                id="foodDrinks"
                checked={this.props.filterStatus.foodDrinks}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="foodDrinks">Food & Drinks</label> <br />
              <input
                type="checkbox"
                name="cultureArts"
                id="cultureArts"
                checked={this.props.filterStatus.cultureArts}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="cultureArts">Culture & Arts</label> <br />
              <input
                type="checkbox"
                name="sports"
                id="sports"
                checked={this.props.filterStatus.sports}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="sports">Sports</label> <br />
              <input
                type="checkbox"
                name="party"
                id="party"
                checked={this.props.filterStatus.party}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="party">Party</label>
            </div>
            <div style={{ flex: "1" }}>
              <input
                type="checkbox"
                name="hikes"
                id="hikes"
                checked={this.props.filterStatus.hikes}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="hikes">Hikes</label> <br />
              <input
                type="checkbox"
                name="nature"
                id="nature"
                checked={this.props.filterStatus.nature}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="nature">Nature</label> <br />
              <input
                type="checkbox"
                name="other"
                id="other"
                checked={this.props.filterStatus.other}
                onChange={this.props.handleFilterChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          <button>Apply</button>
        </form>
      </div>
    );
  }
}

export default Filters;
