import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { requestTrips } from "../../services/api";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "../../stylesheets/profile.css";

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
    followers: 0
  };

  handleFollowClick() {
    axios
      .put("/api/user/updateFollower", {
        creatorId: this.state.creatorProfileId
      })
      .then((updatedfollow) => {
        console.log("My updated follwing array", updatedfollow);
        this.setState({
          isFollowing: !this.state.isFollowing,
          followers: updatedfollow.data.followers.length
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
          .get(`/api/user/${this.state.creatorProfileId}`)
          .then((user) => {
            this.setState(
              {
                creatorInfos: user.data,
                followers: user.data.followers.length
              }
            );
          })
          .catch((err) => {
            axios
              .get(`/api/user/${this.state.creatorProfileId}`)
              .then((user) => {
                this.setState({
                    creatorInfos: user.data
                  });
              })
              .catch((err) => {
                console.log(
                  "Problem getting user",
                  this.state.creatorProfileId
                );
              });
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
              className="d-block w-100 slider"
              src={gem.imageUrl}
              alt="gem"
            />
            <Carousel.Caption>
              <h3 style={{ fontWeight: 900 }}>{gem.title}</h3>
              <p style={{ fontWeight: 500 }}>{gem.locationName}</p>

              <a href={`/gem/${gem._id}`}>
                <div
                  className="generalBtn btn btn-primary"
                  onClick={() => console.log("test")}
                >
                  Explore
                </div>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  showTrips = () => {
    if (!this.state.trips) {
      return <div>No trips created yet. Start to create a Gem :)</div>;
    } else {
      return this.state.trips.map((element) => {
        return (
          <div>
            <Link to={`/trip/${element._id}`}>
              <Button className="btn-triplist">{element.name} ></Button>
            </Link>
            <hr />
          </div>
        );
      });
    }
  };

  render() {
    let user = this.state.creatorInfos;
    console.log("Creator Infos", this.state.creatorInfos);
    return (
      <div className="narrow-view-bg">
        <div className="profile-flexbox page-wrapper-narrow">
          <div className="nameedit">
            <div>
              <h1>
                {this.state.creatorInfos !== null &&
                  this.state.creatorInfos.username}
              </h1>
            </div>

            <div>
              {this.state.ownprofile ? (
                <Link to="/profile">
                  <Button
                    variant="contained"
                    type="button"
                    className="editprof btn-primary btn generalBtn"
                  >
                    Edit
                  </Button>
                </Link>
              ) : (
                <div>
                  {this.state.isFollowing ? (
                    <button
                      className="follow-button btn btn-primary generalBtn"
                      onClick={(event) => this.handleFollowClick(user._id)}
                    >
                      Unfollow{" "}
                      <img src="https://res.cloudinary.com/dy9sawxrm/image/upload/v1570697521/gembox/icons/followed-user_dlgqrl.png" />
                    </button>
                  ) : (
                    <button
                      className="follow-button btn btn-primary generalBtn-disabled"
                      onClick={(event) => this.handleFollowClick(user._id)}
                    >
                      Follow{" "}
                      <img src="https://res.cloudinary.com/dy9sawxrm/image/upload/v1570697521/gembox/icons/follow-user_xix0yg.png" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="headerinfo">
            <div className="profilepic">
              <img
                src={
                  this.state.creatorInfos !== null &&
                  this.state.creatorInfos.profilePic
                }
              />
            </div>
            <div className="basiccounts">
              <p>
                Score
                <span className="Score">1200</span>
              </p>
              <p>
                Followers
                <span className="Score">{this.state.followers}</span>
              </p>
              <p>
                Following
                <span className="Score">
                  {this.state.creatorInfos !== null && this.state.creatorInfos.following.length}
                </span>
              </p>
            </div>
          </div>
          <div className="experiences-discoveries">
            <div>
              <img src="https://res.cloudinary.com/dy9sawxrm/image/upload/v1570697079/gembox/icons/diamond-icon-gold_a6lkxq.png" />

              <span className="Score"> {this.state.discoveries}</span>
              <span> Discoveries </span>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dy9sawxrm/image/upload/v1570697079/gembox/icons/diamond-icon-green_kjzvbz.png" />

              <span className="Score">{this.state.experiences}</span>
              <span> Experiences</span>
            </div>
          </div>
          <div className="travelinterests">
            <div className="topicheader">
              <h2>Travelinterests</h2> <hr />
              <div>
                {this.state.creatorInfos !== null &&
                  this.state.creatorInfos.travelInterests}
              </div>
            </div>
          </div>
          <div className="topicheader">
            <h2>Most popular gems</h2>
            <hr />
            <div className="gemlist">{this.displayPopularGems()}</div>
          </div>

          <div className="trips">
            <div className="topicheader">
              <h2>All Trips</h2>
              <hr />
              <div>{this.showTrips()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
