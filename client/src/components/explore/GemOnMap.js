import React from 'react'
import ReactMapGL, {
  Marker, Popup
} from "react-map-gl";
/*
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
*/
const GemOnMap = props => {
  const categoriesStrings={
    "foodDrinks": "Food & Drinks",
    "cultureArts": "Culture & Arts",
    "hikes": "Hikes",
    "nature": "Nature",
    "party": "Party",
    "sports": "Sports",
    "others": "Other"
  }
  return (
    <div>
      <Marker
            latitude={props.data.latitude}
            longitude={props.data.longitude}
            captureClick={false}
            draggable={false}
            offsetTop={-100}
            offsetLeft={-50}
            >
            <div className="gem-marker">
              <p>{props.data.title}</p>
              <p style={{color: "green"}}>{categoriesStrings[props.data.category]}</p>
              <img src="/images/blue_gem.png" alt="Gem"/>
            </div>
          </Marker>
    </div>
  )
}

export default GemOnMap
