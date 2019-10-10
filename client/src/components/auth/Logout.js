import React from "react";
import { getQuote } from "../../services/api";

export default class Logout extends React.Component {
  state = {
    quote: "",
    author: ""
  };

  componentDidMount() {
    getQuote().then(n => {
      console.log(n);
      this.setState({
        quote: n.quote,
        author: n.author
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="wisdom-wrapper">
          <div className="header-box">
            <h1>Enjoy your Trip!</h1>
          </div>

          <div className="wisdom">
            {/*    <div className="quote">{this.state.quote}</div>
            <div className="author">- {this.state.author}</div> */}

            <p>
              <q>"{this.state.quote}"</q>
            </p>
            <p>- {this.state.author}</p>
          </div>
        </div>
      </div>
    );
  }
}
