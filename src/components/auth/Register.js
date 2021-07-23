import React from "react";
import { Form, Button, Input, Col, Row } from "reactstrap";

import Loading from "../LoadingComponent";
import Message from "../MessageComponent";

class Register extends React.Component {
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
    // register logic
    this.props.registerUser(this.state);
  }
  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        {this.props.auth.isRegisterLoading && <Loading />}
        {this.props.auth.isRegisterSuccess && (
          <Message
            msg="Register Success! Please Login your account."
            type="success"
          />
        )}
        {this.props.auth.registerErr && (
          <Message msg={this.props.auth.registerErr} type="error" />
        )}
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
            Register
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Register;
