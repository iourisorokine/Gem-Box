import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const GemOnMap = props => {

  return (
    <div>
        <Marker
          latitude={props.data.latitude}
          longitude={props.data.longitude}
          captureClick={false}
          draggable={false}
          offsetTop={-30}
          offsetLeft={-15}>
          <div className="gem-marker" onClick={
                  ()=>{props.openPopup(props.data)}
                }>
            <img src="/images/blue_gem.png" alt="Gem"/>
          </div>
        </Marker>
    </div>
  );
};

export default GemOnMap;
