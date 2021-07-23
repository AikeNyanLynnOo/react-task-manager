import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  render() {
    this.props.logoutUser();
    return <Redirect to="/home"/>
  }
}

export default Logout;
