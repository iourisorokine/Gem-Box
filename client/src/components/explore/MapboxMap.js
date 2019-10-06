import React, { useState } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  GeolocateControl
} from "react-map-gl";


const TOKEN = process.env.MAPBOX_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px"
};

const MapboxMap = props => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 500,
    latitude: 52.520008,
    longitude: 13.404954,
    zoom: 9
  });

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 100 });

  return (
    <div style={{ margin: "0 auto" }}>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle={props.style}
        onViewportChange={_onViewportChange}>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  );
};

export default MapboxMap;