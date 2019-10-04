import React, { Component } from "react";
import { Link } from "react-router-dom";
import {logout} from '../services/api'
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

  handleLogout = props=>{
    console.log("LOGOUT PROPS: ",props)
    logout().then(()=>{
      props.setUser(null);
    })
  }

  render() {
    console.log("HOME PROPS: ", this.props);
    return (
      <div>
      <p>This is home page, dummy version</p>
        {this.props.user?(<>
        <p>Hello {this.props.user.username}!</p>

        <Link onClick={()=>this.handleLogout(this.props)}>Logout</Link>
        </>):(
          <>
        <p>no user</p>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
        </>
        )}
        {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )}
      </div>
    );
  }
}

export default Home;
