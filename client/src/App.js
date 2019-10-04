import React from 'react';
import './App.css';
import Filters from "./components/Filters";
import ExplorePlaces from "./components/ExplorePlaces";

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Filters/>
        {/* <ExplorePlaces/> */}
      </div>
    );
  }
}

export default App;
