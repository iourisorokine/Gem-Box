import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import ExplorePlaces from "./components/ExplorePlaces";
import UpdateProfile from "./components/UpdateProfile";
import TestProfile from "./components/TestProfile";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Logout from "./components/Logout";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = (user) => {
    this.setState({
      user: user
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        the app renders here
        <Route
          render={(props) => (
            <Menu user={this.state.user} setUser={this.setUser} {...props} />
          )}
        />
        {!this.state.user && (
          <Landing user={this.state.user} setUser={this.setUser} />
        )}
        {this.state.user ? (
          <>
            <Route
              path="/profile"
              render={(props) => (
                <ExplorePlaces
                  setUser={this.setUser}
                  user={this.state.user}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={(props) => (
                <Logout
                  setUser={this.setUser}
                  user={this.state.user}
                  {...props}
                />
              )}
            />
          </>
        ) : (
          <></>
        )}
        <Route
          exact
          path="/"
          user={this.state.user}
          setUser={this.setUser}
          component={Landing}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />
        <Route exact path="/auth/:id" component={TestProfile} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/update-profile" component={UpdateProfile} />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/explore-places"
          render={(props) => (
            <ExplorePlaces user={this.state.user} {...props} />
          )}
        />
      </div>
    );
  }
}

export default App;
