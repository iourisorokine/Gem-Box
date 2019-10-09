import React, { Component } from "react";
import ShowProfile from "./ShowProfile";
import UpdateProfile from "./UpdateProfile";

export default class Profile extends Component {
  state = {
    ShowProfile: true,
    user: this.props.user
  };

  changeComponent = () => {
    this.setState({
      ShowProfile: !this.state.ShowProfile
    });
  };

  setUser = (user) => {
    console.log("State bevore user update", this.state);
    this.setState({
      user: user,
      ShowProfile: !this.state.ShowProfile
    });
    console.log("State after user update", this.state);
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.state.ShowProfile ? (
          <ShowProfile
            user={this.state.user}
            changeComponent={this.changeComponent}
          />
        ) : (
          <UpdateProfile
            user={this.state.user}
            changeComponent={this.changeComponent}
            setUser={this.setUser}
          />
        )}
      </div>
    );
  }
}
