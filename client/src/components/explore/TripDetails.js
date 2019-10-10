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
import { Link } from "react-router-dom";
import "../../stylesheets/tripdetails.css";
import Button from "@material-ui/core/Button";

class TripDetails extends Component {
  state = {
    viewport: {
      width: "100%",
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
      .then(async (trip) => {
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

  drawTrip = (coordinates) => {
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

  showGems = () => {
    console.log(
      "Here is showTrips elements:",
      this.state.trip_details.gemsVisited
    );
    if (this.state.trip_details && this.state.trip_details.gemsVisited) {
      return this.state.trip_details.gemsVisited.map((element) => {
        return (
          <div>
            <Link to={`/gem/${element._id}`}>
              <Button className="btn-triplist">{element.title} ></Button>
            </Link>
            <hr />
          </div>
        );
      });
    }
  };
  gemsDisplay = () => {
    if (Object.keys(this.state.trip_details).length !== 0) {
      return this.state.trip_details.gemsVisited.map((gem) => {
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
    return (
      <>
        <div>
          <div className="pageheader">
            {this.state.trip_details.name && this.state.trip_details.name && (
              <h3> {this.state.trip_details.name}</h3>
            )}
          </div>
          <div className="mapposition">
            <ReactMapGL
              {...this.state.viewport}
              ref={(reactMap) => (this.reactMap = reactMap)}
              onViewportChange={(viewport) =>
                this.setState({
                  viewport: viewport
                })
              }
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/iouri/ck1kx1czi1r971cpj0s2ngu2q"
              /* captureDoubleClick={false}
          doubleClickZoom={false}
 */
            >
              {this.gemsDisplay()}

              <div style={{ position: "absolute", right: "2vw", top: "10vh" }}>
                <NavigationControl
                  onViewportChange={(viewport) => this.setState({ viewport })}
                />
              </div>
            </ReactMapGL>
          </div>
          <div className="padding-wrapper">
            <div className="creatorinfos">
              <p>Created by </p>
              <p>
                {this.state.trip_details && this.state.trip_details.creator && (
                  <a href={`/profile/${this.state.trip_details.creator._id}`}>
                    {this.state.trip_details.creator.username}
                  </a>
                )}
              </p>
            </div>
            <div>
              <h2>Explore Gems of the Trip</h2>
              <hr />
              <div>{this.showGems()}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TripDetails;
