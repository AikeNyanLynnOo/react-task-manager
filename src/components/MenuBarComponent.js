import React, { useState } from "react";
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
import { NavLink, Link } from "react-router-dom";

const MenuBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="primary" expand="md" className="fixed-top px-5">
      <NavbarBrand href="/" className="text-white">
        To Do List
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
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
              <DropdownItem divider />
              <DropdownItem>Filters</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="my-navbar">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <i className="fa fa-user"></i>
            </DropdownToggle>
          <DropdownMenu className="my-dropitems" right>
              <DropdownItem>
                <Link to="/user/login">Login</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/user/profile">Profile</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to="/user/logout">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default MenuBar;
