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
          offsetTop={-100}
          offsetLeft={-50}>
          <div className="gem-marker">
            <div className="gem-label">
              <p>{props.data.title}</p>
              <button
                onClick={
                  ()=>props.openPopup(props.data.latitude,props.data.longitude)
                }>
                click me
              </button>
              <p style={{ color: "green" }}>
                {categoriesStrings[props.data.category]}
              </p>
            </div>
            <img src="/images/blue_gem.png" alt="Gem" />
          </div>
        </Marker>
      </>
    </div>
  );
};

export default GemOnMap;
