import React from "react";
import { getQuote } from "../services/api";

export default class Logout extends React.Component {
  state = {
    quote: "",
    author: ""
  };

  componentDidMount() {
    getQuote().then((n) => {
      console.log(n);
      this.setState({
        quote: n.quote,
        author: n.author
      });
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.quote}</div>
        <div>{this.state.author}</div>
      </div>
    );
  }
}
