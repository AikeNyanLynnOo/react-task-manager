import React from "react";
import { withRouter, Redirect } from "react-router-dom";
class Profile extends React.Component {
  render() {
    if (this.props.auth.isLoggedIn) {
      return <div>Hello {this.props.auth.user.email}</div>;
    } else {
      return <Redirect to="/home" />;
    }
  }
}

export default withRouter(Profile);
