import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GemOnMap from "./GemOnMap";
import ReactMapGL, {
  Popup,
  NavigationControl,
  GeolocateControl
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import GemDetails from "./GemDetails";
import { throws } from "assert";

class MapGems extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 70.520008,
      longitude: 70.404954,
      zoom: 2
    },
    gemSelectedInfo: this.props.gemSelectedInfo,
    displayDetails: false
  };

  openPopup = gemData => {
    this.setState({
      gemSelectedInfo: {
        ...gemData
      }
    });
  };

  closeDetails = () => {
    this.setState({
      displayDetails: false,
      gemSelectedInfo: null
    });
  };

  openDetails = () => {
    this.setState({
      displayDetails: true
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: userLocation.lat,
          longitude: userLocation.long
        }
      });
    });
  };

  onGeocontrolSelected = (viewport, item) => {
    this.setState({
      viewport: viewport,
      marker: {
        longitude: viewport.longitude,
        latitude: viewport.latitude
      }
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
            <img
              className="gem-popup-img"
              src={gemSelectedInfo.imageUrl}
              alt=""
            />
            <p className="gem-popup-title">{gemSelectedInfo.title}</p>
            <p className="gem-popup-date">
              {gemSelectedInfo.created_at.slice(0, 10)}
            </p>
            <button onClick={this.openDetails} className="gem-popup-link">
              Explore
            </button>
          </div>
        </Popup>
      )
    );
  };

  render() {
    const gemsToRender = this.props.gems.map(gem => {
      return <GemOnMap key={gem._id} data={gem} openPopup={this.openPopup} />;
    });
    this.setUserLocation();
    return (
      <div className="page-wrapper">
        {this.state.displayDetails ? (
          <>
            <GemDetails
              data={this.state.gemSelectedInfo}
              user={this.props.user}
              closeDetails={this.closeDetails}
            />
          </>
        ) : (
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
            <div style={{ position: "absolute", right: "2vw", top: "10vh" }}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            <div>
              <Button
                style={{
                  position: "absolute",
                  right: "2vw",
                  top: "2vh",
                  backgroundColor: "#09d3ac"
                }}
                onClick={this.props.toggleFilters}>
                <i className="fas fa-filter"></i>
              </Button>
            </div>
            <div style={{ position: "absolute", left: "20%", top: "2vh" }}>
              <Geocoder
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onSelected={this.onGeocontrolSelected}
                viewport={this.state.viewport}
                hideOnSelect={true}
              />
            </div>
            {gemsToRender}
            {this.renderPopup()}
          </ReactMapGL>
        )}
      </div>
    );
  }
}

export default MapGems;
