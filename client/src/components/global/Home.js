import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

class Home extends Component {
  state={
    user: null
  }

  componentDidMount=()=>{
    this.setState({
      user: this.props.user
    })
  }

  render() {
    console.log("HOME PROPS: ", this.props);
    return (
      <div style={{border:"1px solid blue"}}>
      <h1>Gem Box</h1>
      <h2>Get inspired</h2>
      <h2>Find places</h2>
      <h2>Share discoveries</h2>
        <>
        <p>no user</p>
        <p>
        <Link to="/Login">Login</Link>
        </p>  
        <p>
        <Link to="/Signup">Signup</Link>
        </p>
        </>
        {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )}
      </div>
    );
  }
}

export default Home;
