import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink, Link, withRouter } from "react-router-dom";

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <Navbar color="primary" expand="md" className="fixed-top px-5">
        <NavLink
          to="/home"
          className="nav-link text-white"
          style={{ fontSize: 20+"px" }}
        >
          To Do List
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="me-auto my-navbar" navbar>
            <NavLink to="/tasks" className="nav-link">
              All Tasks
            </NavLink>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu className="drop-options">
                <Link to="/projects" className="drop-link">
                  <DropdownItem>Projects &amp; Labels</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="my-navbar">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="px-0">
                {this.props.auth.isLoggedIn ? (
                  this.props.auth.user.email
                ) : (
                  <i className="fa fa-user"></i>
                )}
              </DropdownToggle>
              <DropdownMenu
                className={this.props.auth.isLoggedIn ? "" : "my-nav-dropitems"}
              >
                {!this.props.auth.isLoggedIn && (
                  <React.Fragment>
                    <Link to="/login" className="drop-link">
                      <DropdownItem>Login</DropdownItem>
                    </Link>
                    <Link to="/register" className="drop-link">
                      <DropdownItem>Register</DropdownItem>
                    </Link>
                  </React.Fragment>
                )}
                {this.props.auth.isLoggedIn && (
                  <React.Fragment>
                    <Link to="/profile" className="drop-link">
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/logout" className="drop-link">
                      <DropdownItem>Logout</DropdownItem>
                    </Link>
                  </React.Fragment>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default withRouter(MenuBar);
