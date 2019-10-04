import React from "react";
// import { Route, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
// import CreateProfile from "./components/CreateProfile";
import TestProfile from "./components/TestProfile";
import { Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/auth/:id" component={TestProfile} />
      </Switch>
      {/* <TestProfile /> */}
      {/* <CreateProfile /> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
