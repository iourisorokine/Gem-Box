import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GemOnMap from "./GemOnMap";
import ReactMapGL, {
  Popup,
  NavigationControl
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import GemDetails from "./GemDetails";

class MapGems extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "95vh",
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

  componentDidMount=()=>{
    this.setUserLocation();
  }

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
    const categoryRender = {
      foodDrinks: ["Food & Drinks", "#363"],
      cultureArts: ["Culture & Arts", "#229"],
      hikes: ["Hikes", "#4badb6"],
      nature: ["Nature & Sight", "#2b2"],
      party: ["Party", "#811"],
      sports: ["Sports", "#292"],
      others: ["Others", "#555"]
    };
    return (
      gemSelectedInfo && (
        <Popup
          className="gem-popup"
          tipSize={5}
          anchor="top"
          latitude={gemSelectedInfo.latitude}
          longitude={gemSelectedInfo.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => this.setState({ gemSelectedInfo: null })}>
          <div>
            <img
              className="gem-popup-img"
              src={gemSelectedInfo.imageUrl}
              alt=""
            />
            <p className="gem-popup-title">
              <strong>{gemSelectedInfo.title}</strong>
            </p>
            <p className="gem-popup-category">
              <span
                style={{
                  color: `${categoryRender[gemSelectedInfo.category][1]}`
                }}>
                {categoryRender[gemSelectedInfo.category][0]}
              </span>
            </p>
            <button onClick={this.openDetails} className="gem-popup-btn">
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
            mapStyle="mapbox://styles/iouri/ck1kx1czi1r971cpj0s2ngu2q"
            captureDoubleClick={false}
            doubleClickZoom={false}>
            <div style={{ position: "absolute", right: "2vw", top: "10vh" }}>
              <NavigationControl
                onViewportChange={viewport => this.setState({ viewport })}
              />
            </div>
            <div>
              <Button 
                className="btn btn-primary generalBtn filters-btn"
                onClick={this.props.toggleFilters}>
                <i className="fas fa-filter"></i>
              </Button>
            </div>
            <div className="geocoder-container">
              <Geocoder
                style={{height:"100px"}}
                placeholder="Search for a Gem..."
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onSelected={this.onGeocontrolSelected}
                viewport={this.state.viewport}
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
