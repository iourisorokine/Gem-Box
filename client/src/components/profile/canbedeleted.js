// import React, { Component } from "react";
// import ShowProfile from "./ShowProfile";
// import UpdateProfile from "./UpdateProfile";
// import Button from "@material-ui/core/Button";
// // import UpdateProfile from "./UpdateProfile";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default class Profile extends Component {
//   state = {
//     ShowProfile: true,
//     user: this.props.user,
//     userProfilId: "5d9b843efdd9bd1e03843772"
//   };

//   // changeComponent = () => {
//   //   this.setState({
//   //     ShowProfile: !this.state.ShowProfile
//   //   });
//   // };

//   setUser = (user) => {
//     console.log("State bevore user update", this.state);
//     this.setState({
//       user: user,
//       ShowProfile: !this.state.ShowProfile
//     });
//     console.log("State after user update", this.state);
//   };

//   render() {
//     return (
//       <div>
//         <UpdateProfile
//           user={this.state.user}
//           changeComponent={this.changeComponent}
//           setUser={this.setUser}
//         />
//       </div>
//     );
//   }
// }
