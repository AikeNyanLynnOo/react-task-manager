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
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleLogout() {
    localStorage.removeItem("token");
    this.props.history.go("/");
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
                <DropdownItem>Projects</DropdownItem>
                <DropdownItem>Labels</DropdownItem>
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
                  <DropdownItem>
                    <Link to="/login">Login</Link>
                  </DropdownItem>
                )}
                {this.props.auth.isLoggedIn && (
                  <React.Fragment>
                    <DropdownItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
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
