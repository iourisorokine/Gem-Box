import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const GemOnMap = props => {
  const coordinates=[props.data.latitude, props.data.longitude];
  return (
    <div>
        <Marker
          latitude={props.data.latitude}
          longitude={props.data.longitude}
          captureClick={false}
          draggable={false}
          offsetTop={-30}
          offsetLeft={-15}>
          <div className="gem-marker" onClick={()=>{props.addToTrip(coordinates)}}>
            <img src="/images/blue_gem.png" alt="Gem"/>
          </div>
        </Marker>
    </div>
  );
};


export default GemOnMap;