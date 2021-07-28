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
        <NavbarBrand href="/" className="text-white">
          To Do List
        </NavbarBrand>
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
              <DropdownMenu className="my-dropitems" right>
                <DropdownItem>
                  <Link to="/projects">Projects &amp; Labels</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="my-navbar">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="fa fa-user"></i>
              </DropdownToggle>
              <DropdownMenu className="my-dropitems" right>
                {!this.props.auth.isLoggedIn && (
                  <React.Fragment>
                    <DropdownItem>
                      <Link to="/login">Login</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/register">Register</Link>
                    </DropdownItem>
                  </React.Fragment>
                )}
                {this.props.auth.isLoggedIn && (
                  <React.Fragment>
                    <DropdownItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to="/logout">Logout</Link>
                    </DropdownItem>
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
