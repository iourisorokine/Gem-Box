import React, { Component } from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";

export default class GemDetails extends Component {
  state={
    gemData: this.props.data
  }

  componentDidMount = () => {
    if(!this.state.gemData) this.getGemData();
  };

  getGemData=()=>{
    const id = this.props.match.params.gemId;
    axios
      .get(`/api/gem/${id}`)
      .then(response => {
        this.setState({
          gemData:response.data
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  }

  render() {
    const categoryStrings={
    "foodDrinks":"Food & Drinks",
    "cultureArts": "Culture & Arts",
    "hikes": "Hikes",
    "nature": "Nature & Sight",
    "party": "Party",
    "sports":"Sports",
    "others":"Others"
    }

    const gemData =this.state.gemData;
    if(!gemData) return <></>
    return (
      <div className="gem-details">
        <img className="gem-details-image" src={gemData.imageUrl} alt=""/>
        <div className="flex-row">
          <h3>{gemData.title}</h3>
          {gemData.location&&(<h4>{gemData.location}</h4>)}
        </div>
        <div className="flex-row">
          <h4>Category:</h4>
          <p>{categoryStrings[gemData.category]}</p>
        </div>
        <div className="flex-row">
        <p><strong>Descriprion: </strong>{gemData.description}</p>
        <p><strong>Good to know: </strong>{gemData.goodToKnow}</p>
        <p><strong>Created: </strong>{gemData.created_at.slice(0,10)}</p>
        </div>
        <div className="flex-row">
          <Button onClick={this.props.closeDetails}>Back to Map</Button>
        </div>
      </div>
    )
  }
}
