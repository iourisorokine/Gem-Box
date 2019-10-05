import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import ReactMapGL, {
  Marker,
  // Popup,
  GeolocateControl,
  NavigationControl
} from "react-map-gl";

import Geocoder from "react-mapbox-gl-geocoder";

export class CreateGem extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 1,
      bearing: 0,
      pitch: 0
    },

    marker: {
      markerClicked: false,
      latitude: 52.520008,
      longitude: 13.404954
    }
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };
  /* mapRef = React.createRef();

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  }; */

  onSelected = (viewport, item) => {
    this.setState({
      viewport: viewport,
      marker: {
        longitude: viewport.longitude,
        latitude: viewport.latitude
      }
    });
    console.log("Selected: ", item);
    console.log(viewport);
    console.log(viewport.longitude, viewport.latitude);
  };

  render() {
    console.log(this.state.marker);
    console.log(this.state.viewport);
    return (
      <>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport =>
            this.setState({
              viewport: viewport,
              marker: {
                longitude: viewport.longitude,
                latitude: viewport.latitude
              }
            })
          }
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          captureDoubleClick={false}
          doubleClickZoom={false}
          onDblClick={event => {
            this.setState({
              /*  viewport: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
              }, */
              marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
              }
            });
            console.log("onclickevent", event.lngLat);
          }}
        >
          <Marker
            latitude={this.state.marker.latitude}
            longitude={this.state.marker.longitude}
            offsetTop={-10}
            offsetLeft={-10}
            captureClick={false}
            draggable={true}
            onDragEnd={event =>
              this.setState({
                marker: {
                  longitude: event.lngLat[0],
                  latitude: event.lngLat[1]
                }
              })
            }
          >
            <div className="gem-style"></div>
          </Marker>
          {/*        {this.state.marker.markerClicked ? (
            <Popup
              latitude={this.state.marker.latitude}
              longitude={this.state.marker.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => {
                this.setState({
                  marker: { ...this.state.marker, markerClicked: false }
                });
              }}
            >
              <div>
                latitude={this.state.marker.latitude}
                longitude={this.state.marker.longitude}{" "}
              </div>
            </Popup>
          ) : null} */}
          <div style={{ position: "absolute", right: "2vw", top: "10vh" }}>
            <NavigationControl
              onViewportChange={viewport => this.setState({ viewport })}
            />
          </div>
          <div style={{ position: "absolute", right: "2vw", top: "4vh" }}>
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </div>
          <div>
            {/*   <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            /> */}

            <Geocoder
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onSelected={this.onSelected}
              viewport={this.state.viewport}
              hideOnSelect={true}
            />
          </div>
        </ReactMapGL>
      </>
    );
  }
}

export default CreateGem;
