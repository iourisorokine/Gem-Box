import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default class GemDetails extends Component {
  state = {
    currentGemData: this.props.data,
    currentGemIndex: 0,
    experienceGemData: null,
    creatorData: null
  };

  componentDidMount = () => {
    if (this.state.currentGemData && !this.state.creatorData)
      this.getCreatorData();
    if (!this.state.experienceGemData) this.getExperienceGemData();
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
    const creatorId = this.state.currentGemData.creator;
    axios
      .get(`/api/user/${creatorId}`)
      .then(response => {
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
    console.log(this.props, this.state);
    console.log(this.props.user);
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
    console.log(currentGemData);
    const creatorData = this.state.creatorData;
    if (!currentGemData) return <></>;
    const liked = (this.props.user&&currentGemData.likes.includes(this.props.user._id))
      ? true
      : false;
    const likeClass = liked ? "btn-unlike" : "btn-like";
    return (
      <div className="gem-details">
        <img
          className="gem-details-image"
          src={currentGemData.imageUrl}
          alt=""
        />
        <div className="flex-row-sides">
          {this.state.creatorData && <p>Created by {creatorData.username}</p>}
          <div>
            {this.props.user?(
            <button className={likeClass} onClick={() => this.handleLike()}>
              {liked ? <>Unlike</> : <>Like</>}
            </button>):<>Likes: </> }
            {currentGemData.likes.length}
          </div>
        </div>
        {this.state.experienceGemData &&
          this.state.experienceGemData.length > 1 && (
            <div className="flex-row-sides">
              <button name="previous" onClick={this.getGemExperience}>
                Previous
              </button>
              <button name="next" onClick={this.getGemExperience}>
                Next
              </button>
            </div>
          )}
        <div className="flex-row-sides">
          <h3>{currentGemData.title}</h3>
          {currentGemData.locationName && <p>{currentGemData.locationName}</p>}
        </div>
        <div className="flex-row-sides">
          <h4>Category:</h4>
          <h4>{categoryStrings[currentGemData.category]}</h4>
        </div>
        <div className="flex-row">
          <p>
            <strong>Descriprion: </strong>
            {currentGemData.description}
          </p>
        </div>
        <div className="flex-row">
          <p>
            <strong>Good to know: </strong>
            {currentGemData.goodToKnow}
          </p>
        </div>
        <div className="flex-row">
          <p>
            <strong>Created: </strong>
            {currentGemData.created_at.slice(0, 10)}
          </p>
        </div>
        <div>
          <Button onClick={this.props.closeDetails}>Back to Map</Button>
        </div>
      </div>
    );
  }
}
