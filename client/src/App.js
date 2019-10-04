import React from "react";
// import { Route, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
// import CreateProfile from "./components/CreateProfile";
import TestProfile from "./components/TestProfile";

import "./App.css";

function App() {
  return (
    <div className="App">
      <TestProfile />
      {/* <CreateProfile /> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
