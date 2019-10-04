import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import ExplorePlaces from "./components/ExplorePlaces"

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
        {this.state.user?(
        <>
          <ExplorePlaces user={this.state.user} setUser={this.setUser}/>
        </>
        )
        :(
          <>
          <Landing user={this.state.user} setUser={this.setUser} /></>
        )}
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
      </div>
    );
  }
}

export default App;
