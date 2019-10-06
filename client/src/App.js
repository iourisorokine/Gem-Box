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
    console.log("App state: ",this.state);
    console.log("App props: ",this.props);
    return (
      <div className="App">
        <Route render={props => <Menu setUser={this.setUser} {...props} />}/>
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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/profile/:profileId" component={Profile} />
          <Route path="/trip/:tripId" component={TripDetails} />
          <Route exact path="/explore-places" component={ExplorePlaces} />
          <Route path="/gem/:gemId" component={GemDetails} />
          <Route exact path="/create-gem" component={CreateGem} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    );
    //   <div className="App">
    //     the app renders here
    //     <Route
    //       render={(props) => (
    //         <Menu user={this.state.user} setUser={this.setUser} {...props} />
    //       )}
    //     />
    //     {/* {!this.state.user && (
    //       <Landing user={this.state.user} setUser={this.setUser} />
    //     )} */}
    //     {this.state.user ? (
    //       <>
    //         <Route
    //           path="/profile"
    //           render={(props) => (
    //             <ExplorePlaces
    //               setUser={this.setUser}
    //               user={this.state.user}
    //               {...props}
    //             />
    //           )}
    //         />
    //         <Route
    //           exact
    //           path="/logout"
    //           render={(props) => (
    //             <Logout
    //               setUser={this.setUser}
    //               user={this.state.user}
    //               {...props}
    //             />
    //           )}
    //         />
    //       </>
    //     ) : (
    //       <></>
    //     )}
    //     <Route
    //       exact
    //       path="/"
    //       user={this.state.user}
    //       setUser={this.setUser}
    //       component={Landing}
    //     />
    //     <Route
    //       exact
    //       path="/signup"
    //       render={(props) => <Signup setUser={this.setUser} {...props} />}
    //     />
    //     <Route
    //       exact
    //       path="/login"
    //       render={(props) => <Login setUser={this.setUser} {...props} />}
    //     />
    //     <Route exact path="/auth/:id" component={TestProfile} />
    //     <Route exact path="/logout" component={Logout} />
    //     <Route exact path="/update-profile" component={UpdateProfile} />
    //     <Route
    //       exact
    //       path="/profile"
    //       render={(props) => <Profile user={this.state.user} {...props} />}
    //     />
    //     <Route
    //       exact
    //       path="/explore-places"
    //       render={(props) => (
    //         <ExplorePlaces user={this.state.user} {...props} />
    //       )}
    //     />
    //   </div>
  }
}

export default App;
