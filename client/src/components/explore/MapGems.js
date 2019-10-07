import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GemOnMap from "./GemOnMap";
import ReactMapGL, { Popup } from "react-map-gl";
import GemDetails from "./GemDetails"

class MapGems extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 53.520008,
      longitude: 13.404954,
      zoom: 6
    },
    gemSelectedInfo: null,
    displayDetails: false
  };

  openPopup = (gemData) => {
    this.setState({
      gemSelectedInfo: {
        ...gemData
      }
    });
  };

  closeDetails=()=>{
    this.setState({
      displayDetails: false
    })
  }

  openDetails=()=>{
    console.log("clicked")
    this.setState({
      displayDetails: true
    })
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
       let setUserLocation = {
           lat: position.coords.latitude,
           long: position.coords.longitude
        };
        this.setState({
          userLocation: setUserLocation
       });
    });
  };

  renderPopup = () => {
    const { gemSelectedInfo } = this.state;
    return (
      gemSelectedInfo && (
        <Popup
          className="gem-popup"
          tipSize={5}
          anchor="top"
          latitude={gemSelectedInfo.latitude}
          longitude={gemSelectedInfo.longitude}
          closeOnClick={false}
          onClose={() => this.setState({ gemSelectedInfo: null })}>
          <div>
            <img className="gem-popup-img" src={gemSelectedInfo.imageUrl} alt=""/>
            <p className="gem-popup-title">{gemSelectedInfo.title}</p>
            <p className="gem-popup-date">{gemSelectedInfo.created_at.slice(0,10)}</p>
            <button onClick={this.openDetails} className="gem-popup-link">Explore</button>
          </div>
        </Popup>
      )
    );
  };

  render() {
    const gemsToRender = this.props.gems.map(gem => {
      return (
          <GemOnMap key={gem._id} data={gem} openPopup={this.openPopup} />
      );
    });
    console.log(this.state.displayDetails)
    return (
      <div style={{ border: "1px solid green" }}>
        {this.state.displayDetails&&(<><GemDetails data={this.state.gemSelectedInfo} closeDetails={this.closeDetails}/></>)}
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport =>
            this.setState({
              viewport: viewport
            })
          }
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          captureDoubleClick={false}
          doubleClickZoom={false}>
          {gemsToRender}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapGems;
