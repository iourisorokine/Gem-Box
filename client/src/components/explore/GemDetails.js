import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../stylesheets/gemDetails.css";

export default class GemDetails extends Component {
  state = {
    currentGemData: this.props.data,
    currentGemIndex: 0,
    experienceGemData: null,
    creatorData: null,
    fromProfile: this.props.fromProfile
  };

  componentDidMount = () => {
    if (!this.state.currentGemData) this.getGemData();
    if (this.state.currentGemData && !this.state.creatorData)
      this.getCreatorData();
    if (!this.state.experienceGemData) this.getExperienceGemData();
  };

  getGemData = () => {
    const gemId = this.props.match.params.gemId;
    axios.get(`/api/gem/${gemId}`).then(resp => {
      this.setState({
        currentGemData: resp.data
      });
    });
  };

  handleLike = () => {
    const likes = [...this.state.currentGemData.likes];
    const userId = this.props.user._id;
    if (!likes.includes(userId)) {
      likes.push(this.props.user._id);
    } else {
      likes.splice(likes.indexOf(userId), 1);
    }
    const gemId = this.state.currentGemData._id;
    axios.put(`/api/gem/${gemId}`, { likes }).then(response => {
      console.log(response);
      this.setState({
        currentGemData: { ...response.data, likes: response.data.likes }
      });
    });
  };

  getGemExperience = event => {
    const { currentGemIndex, experienceGemData } = this.state;
    let newGemIndex = currentGemIndex;
    if (event.target.name === "previous" && currentGemIndex > 0)
      newGemIndex -= 1;
    if (
      event.target.name === "next" &&
      currentGemIndex < experienceGemData.length - 1
    )
      newGemIndex += 1;
    const newGemData = experienceGemData[newGemIndex];
    this.setState({
      currentGemIndex: newGemIndex,
      currentGemData: newGemData
    });
  };

  getExperienceGemData = () => {
    axios
      .get(`/api/gem/`)
      .then(response => {
        console.log(response);
        const { latitude, longitude } = this.state.currentGemData;
        const experienceGemData = response.data.filter(gem => {
          return gem.latitude === latitude && gem.longitude === longitude;
        });
        this.setState({
          experienceGemData
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  getCreatorData = () => {
    console.log("get creator data called", this.state.currentGemData.creator);
    const creatorId = this.state.currentGemData.creator;
    axios
      .get(`/api/user/${creatorId}`)
      .then(response => {
        console.log(response);
        this.setState({
          creatorData: response.data
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  render() {
    console.log("Creator data: ", this.state.creatorData);
    if (!this.state.currentGemData) return <></>;
    const profileLink = this.state.currentGemData
      ? "/profile/" + this.state.currentGemData.creator
      : "#";
    const categoryStrings = {
      foodDrinks: "Food & Drinks",
      cultureArts: "Culture & Arts",
      hikes: "Hikes",
      nature: "Nature & Sight",
      party: "Party",
      sports: "Sports",
      others: "Others"
    };
    const currentGemData = this.state.currentGemData;
    if (!currentGemData) return <></>;
    const liked =
      this.props.user && currentGemData.likes.includes(this.props.user._id)
        ? true
        : false;
    const likeClass = liked ? "btn-unlike" : "btn-like";
    return (
      <div className="gem-details page-wrapper ">
        <h3 className="gem-title">{currentGemData.title}</h3>

        <img
          className="gem-details-image"
          src={currentGemData.imageUrl}
          alt=""
        />
        <div className="flex-row-sides creatorDataOnGem">
          {this.state.creatorData && (
            <p className="details-titles">
              {currentGemData.discovery ? (
                <>
                  <img
                    src="images/diamond-icon-gold.png"
                    alt="gem"
                    height="20px"
                  />{" "}
                  Discovered
                </>
              ) : (
                <>
                  <img
                    src="images/diamond-icon-green.png"
                    alt="gem"
                    height="20px"
                  />{" "}
                  Experienced
                </>
              )}{" "}
              by <a href={`/profile/${this.state.creatorData._id}`}>{this.state.creatorData.username}</a>
            </p>
          )}
          <div>
            {this.props.user ? (
              <span className={likeClass} onClick={() => this.handleLike()}>
                {liked ? (
                  <>
                    <i class="fas fa-heart"></i> {currentGemData.likes.length}
                  </>
                ) : (
                  <>
                    <i class="far fa-heart"></i> {currentGemData.likes.length}
                  </>
                )}
              </span>
            ) : (
              <>Likes: {currentGemData.likes.length}</>
            )}
          </div>
        </div>
        {this.state.experienceGemData &&
          this.state.experienceGemData.length > 1 && (
            <div className="flex-row-sides">
              <button
                className="btn-previous"
                name="previous"
                onClick={this.getGemExperience}>
                <i class="fa fa-chevron-left"></i> Previous
              </button>
              <button
                className="btn-next"
                name="next"
                onClick={this.getGemExperience}>
                Next <i class="fa fa-chevron-right"></i>
              </button>
            </div>
          )}
        <div className="gem-details-info">
          <div className="flex-row-sides">
            {currentGemData.locationName && (
              <p>{currentGemData.locationName.substring(0, 30)}...</p>
            )}
          </div>

          <div className="gem-divs">
            <p className="details-titles">Descriprion: </p>
            <p className="details-infos">{currentGemData.description}</p>
          </div>
          <div className="gem-divs">
            <p className="details-titles">Good to know: </p>
            <p className="details-infos">{currentGemData.goodToKnow}</p>
          </div>
          <div className="cat-creat-container">
            <div className="gem-divs">
              <p className="details-titles">Category: </p>
              <p className="details-infos">
                {categoryStrings[currentGemData.category]}
              </p>
            </div>
            <div className="gem-divs">
              <p className="details-titles">Created: </p>
              <p className="details-infos">
                {currentGemData.created_at.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
        {!this.props.closeDetails ? (
          <div>
            <Link className="back-Link" to="/explore-places">
              <Button className="back-btn generalBtn">Back to Map</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Button
              className="back-btn generalBtn"
              onClick={this.props.closeDetails}>
              Back to Map
            </Button>
          </div>
        )}
        <div className="arrow-down">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
    );
  }
}
