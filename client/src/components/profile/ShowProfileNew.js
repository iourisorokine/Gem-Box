import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import { requestTrips } from "../../services/api";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default class Profile extends Component {
  state = {
    popularGems: [],
    trips: [],
    discoveries: 0,
    experiences: 0,
    creatorProfileId: this.props.match.params.profileId,
    ownprofile: this.props.user._id === this.props.match.params.profileId,
    isFollowing: false,
    creatorInfos: null,
    follower: 0
  };

  handleFollowClick() {
    axios
      .put(
        "/api/user/updateFollower",
        { creatorId: this.state.creatorProfileId },
        {
          new: true
        }
      )
      .then((updatedfollow) => {
        console.log("My updated follwing array", updatedfollow);
        this.setState({
          isFollowing: !this.state.isFollowing
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getpopularGems = () => {
    axios
      .get(`/api/gem/creator/${this.state.creatorProfileId}`)
      .then((gems) => {
        let discoveries = gems.data.filter((gems) => gems.discovery).length;
        let experiences = gems.data.filter((gems) => !gems.discovery).length;
        this.setState({
          popularGems: gems.data,
          discoveries,
          experiences
        });
        axios
          .get(`/api/user/user/${this.state.creatorProfileId}`)
          .then((user) => {
            this.setState(
              {
                creatorInfos: user.data
              },
              () => {
                console.log(
                  "Here are the Follower Infors of creator",
                  this.state.creatorInfos
                );
              }
            );
          });
      });
  };

  componentDidMount = () => {
    requestTrips(this.state.creatorProfileId)
      .then((trips) => {
        this.setState({ trips }, () => {
          this.getpopularGems();
          this.showTrips();
        });
      })
      .catch((err) => {
        console.log(err);
      });
    if (
      this.props.user.following &&
      this.props.user.following.includes(this.state.creatorProfileId)
    ) {
      this.setState({ isFollowing: true });
    }
  };

  displayPopularGems = () => {
    return (
      <Carousel className="slider">
        {this.state.popularGems.map((gem) => (
          <Carousel.Item key={gem._id}>
            <img
              className="d-block w-100 sliderpic"
              src={gem.imageUrl}
              alt="gem"
            />
            <Carousel.Caption>
              <h3 style={{ fontWeight: 900 }}>{gem.title}</h3>
              <p style={{ fontWeight: 500 }}>{gem.locationName}</p>
              <a className="generalBtn" href={`/gem/${gem._id}`}>
                Explore
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  showTrips = () => {
    console.log("Here is showTrips elements:", this.state.trips);
    if (!this.state.trips) {
      return <div>No trips created yet. Start to create a Gem :)</div>;
    } else {
      return this.state.trips.map((element) => {
        return (
          <Link to={`/trip/${element._id}`}>
            <Button className="btn-triplist">{element.name} ></Button>
          </Link>
        );
      });
    }
  };

  render() {
    const user = this.props.user;
    console.log("Creator Infos", this.state);
    return (
      <>
        <div className="profile-flexbox">
          <div className="nameedit">
            <div>
              <h1>{user.username}</h1>
            </div>

            <div>
              {this.state.ownprofile ? (
                <Link to="/profile">
                  <Button
                    variant="contained"
                    type="button"
                    className="editprof"
                  >
                    Edit
                  </Button>
                </Link>
              ) : (
                <div>
                  {this.state.isFollowing ? (
                    <Button
                      className="follow-button"
                      onClick={(event) => this.handleFollowClick(user._id)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      className="follow-button"
                      onClick={(event) => this.handleFollowClick(user._id)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="headerinfo">
            <div>
              <img className="profilpic" src={user.profilePic} />
            </div>
            <div className="basiccounts">
              <p>Score: 1200</p>
              <p>
                Followers:
                {this.state.creatorInfos !== null &&
                  // this.state.creatorInfos.followers.length !== 0 &&
                  this.state.creatorInfos.followers.length}
              </p>
              <p>
                Following:
                {this.state.creatorInfos !== null &&
                  // this.state.creatorInfos.following.length !== 0 &&
                  this.state.creatorInfos.following.length}
              </p>
            </div>
          </div>
          <div className="experiences-discoveries">
            <p>Discoveries {this.state.discoveries}</p>
            <p>Experiences {this.state.experiences}</p>
          </div>
          <div className="travelinterests">
            <Accordion defaultActiveKey="1">
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    className="accordion"
                    as={Button}
                    variant="link"
                    eventKey="0"
                  >
                    <Button className="btn-triplist">
                      Travelinterests &#10549;
                    </Button>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{user.travelInterests}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          <div className="populargems">
            <h2>Most popular gems</h2>
            <hr />
            <div className="gemlist">{this.displayPopularGems()}</div>
          </div>
          <div className="trips">
            <h2>All Trips</h2>
            <hr />
            <div className="triplist">{this.showTrips()}</div>
          </div>
          <div className="ProfilePageDetails mx-auto"></div>
        </div>
      </>
    );
  }
}
