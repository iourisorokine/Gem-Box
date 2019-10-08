import React from "react";
import Menu from "./components/global/Menu";
import AboutUs from "./components/global/AboutUs";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Home from "./components/global/Home";
import ExplorePlaces from "./components/explore/ExplorePlaces";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";
import TripDetails from "./components/explore/TripDetails";
import GemDetails from "./components/explore/GemDetails";
import CreateGem from "./components/create/CreateGem";
import NotFound from "./components/global/NotFound";
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          render={props => (
            <Menu user={this.state.user} setUser={this.setUser} {...props} />
          )}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={props => <Login setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={props => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <Profile
                setUser={this.setUser}
                {...props}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/update-profile"
            render={props => (
              <UpdateProfile
                setUser={this.setUser}
                {...props}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/create-gem"
            render={props => <CreateGem setUser={this.setUser} {...props} />}
          />
          <Route exact path="/logout" component={Logout} />
          {/* <Route path="/profile/:profileId" component={Profile} /> */}
          <Route path="/trip" component={TripDetails} />
          <Route
            exact
            path="/explore-places"
            render={props => (
              <ExplorePlaces setUser={this.setUser} {...props} />
            )}
          />
          <Route path="/gem/:gemId" component={GemDetails} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
