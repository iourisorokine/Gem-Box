import React, { Component } from "react";

class Filters extends Component {
  state = {
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
    other: true,

    
    "Food & Drinks": true,
    "Culture & Arts": true,
    "Hikes": true,
    "Nature": true,
    "Party": true,
    "Sports": true,
    "Others":true
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <h1>Filter by</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="checkbox"
              name="showGems"
              id="showGems"
              checked={this.state.showGems}
              onChange={this.handleChange}
            />
            <label htmlFor="showGems">Gems</label>
            <br />
            <input
              type="checkbox"
              name="showTrips"
              id="showTrips"
              checked={this.state.showTrips}
              onChange={this.handleChange}
            />
            <label htmlFor="showTrips">Trips</label>
          </div>
          <div>
            <label htmlFor="userFilter">Show:</label>
            <select
              id="userFilter"
              name="userFilter"
              onChange={this.handleChange}>
              <option
                value="All"
                name="userFilter"
                onChange={this.handleChange}>
                All
              </option>
              <option
                value="liked"
                name="userFilter"
                onChange={this.handleChange}>
                Liked
              </option>
              <option
                value="mine"
                name="userFilter"
                onChange={this.handleChange}>
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
              value={this.state.dateStart} onChange={this.handleChange}></input>
            <label htmlFor="dateStart" >To:</label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              value={this.state.dateEnd} onChange={this.handleChange}></input>
          </div>
          <h2>Categories</h2>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
              <input
                type="checkbox"
                name="foodDrinks"
                id="foodDrinks"
                checked={this.state.foodDrinks}
                onChange={this.handleChange}
              />
              <label htmlFor="foodDrinks">Food & Drinks</label> <br />
              <input
                type="checkbox"
                name="cultureArts"
                id="cultureArts"
                checked={this.state.cultureArts}
                onChange={this.handleChange}
              />
              <label htmlFor="cultureArts">Culture & Arts</label> <br />
              <input
                type="checkbox"
                name="sports"
                id="sports"
                checked={this.state.sports}
                onChange={this.handleChange}
              />
              <label htmlFor="sports">Sports</label> <br />
              <input
                type="checkbox"
                name="party"
                id="party"
                checked={this.state.party}
                onChange={this.handleChange}
              />
              <label htmlFor="party">Party</label>
            </div>
            <div style={{ flex: "1" }}>
              <input
                type="checkbox"
                name="hikes"
                id="hikes"
                checked={this.state.hikes}
                onChange={this.handleChange}
              />
              <label htmlFor="hikes">Hikes</label> <br />
              <input
                type="checkbox"
                name="nature"
                id="nature"
                checked={this.state.nature}
                onChange={this.handleChange}
              />
              <label htmlFor="nature">Nature</label> <br />
              <input
                type="checkbox"
                name="other"
                id="other"
                checked={this.state.other}
                onChange={this.handleChange}
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
