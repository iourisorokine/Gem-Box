import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default class AddExperience extends React.Component {
  state = {
    title: "",
    description: "",
    category: "",
    goodToKnow: "",
    visitedDate: "",
    imageUrl: "",
    message: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    console.log(this.state.description);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      category,
      goodToKnow,
      visitedDate,
      imageUrl
    } = this.state;
    console.log(
      title,
      description,
      category,
      goodToKnow,
      visitedDate,
      imageUrl
    );
  };

  render() {
    return (
      <div>
        <h1> Tell others about your experience</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="title">Title: </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              id="title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description: </Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              id="description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="category">Category </Form.Label>
            <Form.Control as="select" value={this.state.category}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="goodToKnow">Good to know: </Form.Label>
            <Form.Control
              type="text"
              name="goodToKnow"
              value={this.state.goodToKnow}
              onChange={this.handleChange}
              id="goodToKnow"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Date: </Form.Label>
            <Form.Control
              type="text"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              id="date"
            />
          </Form.Group>
          {/* {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )} */}
          <Button type="submit">Create Gem</Button>
        </Form>
      </div>
    );
  }
}
