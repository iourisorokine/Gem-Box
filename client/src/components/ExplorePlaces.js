import React, { useState } from "react";
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl
} from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoiaW91cmkiLCJhIjoiY2swaTRnZGxnMDhyYjNmbXp1cTh4aGY0YSJ9.MmEIAiv3ZCEZzc_VLtZnCg";

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

  const coordPin = {
    lat: 52.520008,
    long: 13.404954
  };

  const handleDrag = event => {
    console.log(event.lngLat);
    coordPin.lat = event.lngLat[1];
    coordPin.long = event.lngLat[0];
  };

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 200 });

  return (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}>
        GeoLocator: Click To Find Your Location or click{" "}
        <a href="/search">here</a> to search for a location
      </h1>
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
        <Marker
          latitude={coordPin.lat}
          longitude={coordPin.long}
          draggable={true}
          onDrag={handleDrag}>
          <div className="marker">
            <img src="map-pin3.png" height="50px" width="50px" />
          </div>
        </Marker>
      </MapGL>
    </div>
  );
};

export default MapboxMap;
