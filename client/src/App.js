import React from "react";
import "./App.css";
import Filters from "./components/Filters";
import ExplorePlaces from "./components/ExplorePlaces";
import { Route } from "react-router-dom";
// import { start } from "repl";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

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
    console.log(this.state)
    return (
      <div className="App">
        the app renders here
        <Home user={this.state.user} setUser={this.setUser} />
        <Route
          exact
          path="/signup"
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
        {/* <Filters />
        <ExplorePlaces /> */}
      </div>
    );
  }
}

export default App;
