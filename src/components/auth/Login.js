import React, { Fragment } from "react";
import { Form, Button, Input, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import Loading from "../LoadingComponent";
import Message from "../MessageComponent";

import { AES } from "crypto-js";

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
    
    this.props.loginUser(this.state);
  }
  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        {this.props.auth.isLoading && <Loading />}
        {this.props.auth.isLoggedIn && <Redirect to="/home" />}
        {this.props.auth.errMsg && (
          <Message msg={this.props.auth.errMsg} type="error" />
        )}
        {!this.props.auth.isLoading && !this.props.auth.isLoggedIn && (
          <Form onSubmit={this.handleSubmit} className="text-center">
            <Row>
              <Col xs="12" md="4" className="mx-auto my-2">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="4" className="mx-auto my-2">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Button type="submit" color="primary" size="md">
              Login
            </Button>
          </Form>
        )}
      </Fragment>
    );
  }
}
export default Login;
