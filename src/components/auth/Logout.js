import React from "react";
class Logout extends React.Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }
}

export default Logout;
