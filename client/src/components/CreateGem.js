import React, { Component } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl
} from "react-map-gl";

export class CreateGem extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 1
    },

    marker: {
      markerClicked: false,
      latitude: 17.385044,
      longitude: 78.486671
    },
    events: {}
  };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragStart = event => {
    this._logDragEvent("onDragStart", event);
    console.log("start");
  };

  _onMarkerDrag = event => {
    this._logDragEvent("onDrag", event);
  };

  _onMarkerDragEnd = event => {
    this._logDragEvent("onDragEnd", event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
  };

  /*  componentDidMount=()=>{
    this.setState({
      marker.latitude: 10.5;
    })
  } */
  render() {
    return (
      <>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          captureDoubleClick={false}
        >
          <Marker
            latitude={this.state.marker.latitude}
            longitude={this.state.marker.longitude}
            offsetTop={-10}
            offsetLeft={-10}
            captureClick={false}
            /*  onDragE={event => {
              this.setState({
                marker: {
                  ...this.state.marker,
                  longitude: event.lngLat[0],
                  latitude: event.lngLat[1]
                }
              });
              console.log(event.lngLat);
            }} */
            draggable={true}
            /*    onDragStart={this._onMarkerDragStart}
            onDrag={this._onMarkerDrag}
            onDragEnd={this._onMarkerDragEnd} */
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
        </ReactMapGL>
      </>
    );
  }
}

export default CreateGem;