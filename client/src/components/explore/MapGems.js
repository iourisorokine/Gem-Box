import React, { Component } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GemOnMap from "./GemOnMap";
import ReactMapGL, { Popup } from "react-map-gl";

class MapGems extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 53.520008,
      longitude: 13.404954,
      zoom: 6
    },
    popupInfo: null
  };

  openPopup = (gemData) => {
    const{latitude, longitude, imageUrl, title, created_at,_id}=gemData
    this.setState({
      popupInfo: {
        latitude,
        longitude,
        imageUrl,
        title,
        _id,
        created_at: created_at.slice(0,10)
      }
    });
  };

  renderPopup = () => {
    const { popupInfo } = this.state;
    console.log(popupInfo);
    const gemUrl=(popupInfo)?`/gem/${popupInfo._id}`:"#";
    return (
      popupInfo && (
        <Popup
          className="gem-popup"
          tipSize={5}
          anchor="top"
          latitude={popupInfo.latitude}
          longitude={popupInfo.longitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}>
          <div>
            <img className="gem-popup-img" src={popupInfo.imageUrl} alt=""/>
            <p className="gem-popup-title">{popupInfo.title}</p>
            <p className="gem-popup-date">{popupInfo.created_at}</p>
            <a className="gem-popup-link" href={gemUrl}>Explore</a>
          </div>
        </Popup>
      )
    );
  };

  render() {
    const gemsToRender = this.props.gems.map(gem => {
      return (
        <div>
          <GemOnMap data={gem} openPopup={this.openPopup} />
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
          doubleClickZoom={false}>
          {gemsToRender}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapGems;
