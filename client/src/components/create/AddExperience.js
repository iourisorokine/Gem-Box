import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Formik } from "formik";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

export default class AddExperience extends React.Component {
  state = {
    message: "",
    isEnabled: false,
    nopic: false
  };

  handleChanges = (event) => {
    const { name, value } = event.target;
    console.log(event.target.visitedDate);
    this.props.fetchGemInfo({
      [name]: value
    });

    //Set timeout change into other function because its asychronouse and can not update checkStatus quickly enough
    setTimeout(() => {
      this.setState(
        {
          isEnabled: this.props.checkStatus()
        },
        () => console.log("updated state", this.state)
      );
    }, 10);
  };

  noPicProceed = (event) => {
    event.preventDefault();
    if (event.target.name === "yes") {
      this.props.fetchGemInfo({
        stage: "GemSuccess"
      });
      this.props.createGem();
    } else {
      this.setState({
        message: ""
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    const files = event.target.imageUrl.files[0];
    const uploadData = new FormData();
    uploadData.append("imageUrl", files);
    axios
      .post("/api/gem/add-image", uploadData)
      .then((response) => {
        this.props.fetchGemInfo({
          imageUrl: response.data.secure_url,
          stage: "GemSuccess"
        });
        this.props.createGem();
      })
      .catch((err) => {
        this.setState({
          message: "You want to proceed without uploading a picture?"
        });
      });
  };

  render() {
    return (
      <div>
        <h1> Tell others about your Experience</h1>
        {this.props.locationName && (
          <h2>{this.props.locationName.substring(0, 30)}...</h2>
        )}

        {this.state.message && (
          <div>
            <h3>{this.state.message}</h3>
            <button onClick={this.noPicProceed} name="yes">
              Yes
            </button>
            <button onClick={this.noPicProceed} name="no">
              No
            </button>
          </div>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="title">Title: </Form.Label>
            <Form.Control
              required
              onChange={this.handleChanges}
              type="text"
              name="title"
              id="title"
              value={this.props.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description: </Form.Label>
            <Form.Control
              required
              onChange={this.handleChanges}
              type="text"
              name="description"
              id="description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="category">Category </Form.Label>
            <Form.Control
              required
              onChange={this.handleChanges}
              name="category"
              as="select"
            >
              <option value="">Choose a category</option>
              <option value="cultureArts">Culter & Arts</option>
              <option value="foodDrinks">Food & Drinks</option>
              <option value="hikes">Hikes</option>
              <option value="nature">Nature</option>
              <option value="party">Party</option>
              <option value="sports">Sports</option>
              <option value="others">Others</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="goodToKnow">Good to know: </Form.Label>
            <Form.Control
              required
              onChange={this.handleChanges}
              type="text"
              name="goodToKnow"
              id="goodToKnow"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="visitedDate">Date: </Form.Label>
            <Form.Control
              required
              onChange={this.handleChanges}
              type="date"
              name="visitedDate"
              id="visitedDate"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="file" name="imageUrl" />
          </Form.Group>
          <Button disabled={!this.state.isEnabled} type="submit">
            Create Gem
          </Button>
        </Form>
      </div>
    );
  }
}
