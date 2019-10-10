import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import React, { Component } from "react";
import ReactMapGL, {
  Marker,
  // Popup,
  GeolocateControl,
  NavigationControl
} from "react-map-gl";

class TripDetails extends Component {
  state = {
    viewport: {
      width: "80%",
      height: "50vh",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 4,
      bearing: 0,
      pitch: 0
    },
    coordinates: [],
    trip_details: {}
  };

  componentDidMount() {
    let coordinates = [];
    let trip_details = {};
    axios
      .get(`/api/trip/tripgems/${this.props.match.params.tripId}`)
      .then(async trip => {
        trip_details = { ...trip.data };
        console.log(trip.data.gemsVisited);
        // const promises = trip.data.gemsVisited.map((gem, index) => {
        // trip.data.gemsVisited.map((gem, index) => {
        for (const [index, gem] of trip.data.gemsVisited.entries()) {
          if (index !== trip.data.gemsVisited.length - 1) {
            const res = await axios.get(
              `https://api.mapbox.com/directions/v5/mapbox/cycling/${gem.longitude},${gem.latitude};${trip.data.gemsVisited[index + 1].longitude},${trip.data.gemsVisited[index + 1].latitude}?geometries=geojson&access_token=` +
                process.env.REACT_APP_MAPBOX_TOKEN
            );
            console.log(res.data.routes[0].geometry.coordinates);
            coordinates.push(...res.data.routes[0].geometry.coordinates);
            //  console.log("coordinates", coordinates);
          }
          console.log(index);
        }
        // return Promise.all(promises);
        // })
        // .then(x => {
        //   console.log("done", x);
        if (coordinates.length > 0) {
          console.log(coordinates[Math.floor(coordinates.length / 2)][0]);
          console.log(coordinates[Math.floor(coordinates.length / 2)][1]);

          this.setState({
            coordinates: coordinates,
            viewport: {
              ...this.state.viewport,
              latitude: coordinates[Math.floor(coordinates.length / 2)][1],
              longitude: coordinates[Math.floor(coordinates.length / 2)][0]
            },

            trip_details: trip_details
          });

          this.drawTrip(coordinates);
        }
      });
  }

  drawTrip = coordinates => {
    const map = this.reactMap.getMap();
    map.on("load", () => {
      //add the GeoJSON layer here
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#1B4F72",
          "line-width": 4
        }
      });
    });
  };

  gemsDisplay = () => {
    if (Object.keys(this.state.trip_details).length !== 0) {
      return this.state.trip_details.gemsVisited.map(gem => {
        return (
          <Marker
            latitude={gem.latitude}
            longitude={gem.longitude}
            offsetTop={-30}
            offsetLeft={-15}
            captureClick={false}
            draggable={false}
          >
            <div className="gem-marker">
              <img src="/images/diamond-icon-green.png" alt="Gem" />
            </div>
          </Marker>
        );
      });
    }
  };

  render() {
    //  console.log(this.state.trip);
    console.log(this.state.coordinates);
    console.log(this.state);
    return (
      <>
        <div>
          <h2>Route details</h2>
        </div>
        <ReactMapGL
          {...this.state.viewport}
          ref={reactMap => (this.reactMap = reactMap)}
          onViewportChange={viewport =>
            this.setState({
              viewport: viewport
            })
          }
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/iouri/ck1kkzpus4iir1dmi0h34dz0s"
          /* captureDoubleClick={false}
          doubleClickZoom={false}
 */
        >
          {this.gemsDisplay()}

          <div style={{ position: "absolute", right: "2vw", top: "10vh" }}>
            <NavigationControl
              onViewportChange={viewport => this.setState({ viewport })}
            />
          </div>
        </ReactMapGL>
        <h1>this.state.trip.title</h1>
        <p>
          <a href={`/profile/${this.state.trip.creator._id}`}>
            this.state.trip.creator.username
          </a>
        </p>
      </>
    );
  }
}

export default TripDetails;
