import React, { Component } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GemOnMap from "./GemOnMap";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup
} from "react-map-gl";

class MapGems extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 6
    },
    popupInfo: {
      latitude: 53.520008,
      longitude: 14.404954
    }
  };

  renderPopup() {
    const { popupInfo } = this.state;
    console.log(popupInfo)
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={53.520008}
          latitude={14.404954}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}>
          <div>Hello I am Popup</div>
        </Popup>
      )
    );
  }

  render() {
    const gemsToRender = this.props.gems.map(gem => {
      return (
        <div>
          <GemOnMap data={gem} renderPopup={this.renderPopup}/>
        </div>
      );
    });

    return (
      <div style={{ border: "1px solid green" }}>
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
              marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
              }
            });
          }}>
          {gemsToRender}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapGems;
