import React, { Fragment } from "react";
import { Form, Button, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

import Loading from "../LoadingComponent";
import Error from "../ErrorComponent";

import {AES} from "crypto-js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    // login logic
    const cipertxt = AES.encrypt(JSON.stringify(this.state), '123').toString()
    localStorage.setItem("token",cipertxt);
    this.props.loginUser(this.state);
  }
  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        {this.props.auth.isLoading && <Loading />}
        {this.props.auth.isLoggedIn && <Redirect to="/home" />}
        {this.props.auth.errMsg && <Error errMsg={this.props.auth.errMsg} />}
        {!this.props.auth.isLoading && !this.props.auth.isLoggedIn && (
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <Button type="submit" color="primary" size="sm">
              Login
            </Button>
          </Form>
        )}
      </Fragment>
    );
  }
}
export default Login;
