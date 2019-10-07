import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const GemOnMap = props => {
  const categoriesStrings = {
    foodDrinks: "Food & Drinks",
    cultureArts: "Culture & Arts",
    hikes: "Hikes",
    nature: "Nature",
    party: "Party",
    sports: "Sports",
    others: "Other"
  };


  console.log("gem props: ", props);
  return (
    <div>
      <>
        <Marker
          latitude={props.data.latitude}
          longitude={props.data.longitude}
          captureClick={false}
          draggable={false}
          offsetTop={-30}
          offsetLeft={-15}>
          <div className="gem-marker" onClick={
                  ()=>props.openPopup(props.data.latitude,props.data.longitude)
                }>
            <img src="/images/blue_gem.png" alt="Gem" />
          </div>
        </Marker>
      </>
    </div>
  );
};

export default GemOnMap;
