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
import ShowProfileNew from "./components/profile/ShowProfileNew";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = (user) => {
    this.setState({
      user: user
    });
  };

  setUserProfile = (userid) => {
    console.log("HERE setUser called", userid);
    this.setState({
      creatorProfile: userid
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home user={this.state.user} setUser={this.setUser} {...props} />
            )}
          />
          <>
            <Route
              render={(props) => (
                <Menu
                  user={this.state.user}
                  setUser={this.setUser}
                  {...props}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/login"
                render={(props) => <Login setUser={this.setUser} {...props} />}
              />
              <Route
                exact
                path="/signup"
                render={(props) => <Signup setUser={this.setUser} {...props} />}
              />
              )} />
              <Route
                exact
                path="/create-gem"
                render={(props) => (
                  <CreateGem {...props} user={this.state.user} />
                )}
              />
              <Route exact path="/logout" component={Logout} />
              <Route
                exact
                path="/explore-places"
                render={(props) => (
                  <ExplorePlaces
                    setUser={this.setUser}
                    {...props}
                    user={this.state.user}
                    referredbyProfile={this.state.referredbyProfile}
                  />
                )}
              />
              <Route
                exact
                path="/profile"
                render={(props) => (
                  <Profile
                    setUser={this.setUser}
                    {...props}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                path="/profile/:profileId"
                component={ShowProfileNew}
                creatorProfile={this.state.creatorProfile}
              />
              <Route exact path="/trip" component={TripDetails} />
              <Route path="/trip/:tripId" component={TripDetails} />
              <Route
                exact
                path="/gem/:gemId"
                render={(props) => (
                  <GemDetails {...props} user={this.state.user} />
                )}
              />
              <Route exact path="/about-us" component={AboutUs} />
              <Route component={NotFound} />
            </Switch>
          </>
        </Switch>
      </div>
    );
  }
}

export default App;
