import React from "react";
import { withRouter } from "react-router-dom";
class Profile extends React.Component {
  render() {
    return <div>Hello {this.props.user.email}</div>;
  }
}

export default withRouter(Profile);
