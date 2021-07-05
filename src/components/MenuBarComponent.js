import React,{useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const MenuBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
        return (
            <Navbar light expand="md" className="my-navbar fixed-top px-5" >
                <NavbarBrand href="/">To Do List</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink to="/tasks" className="nav-link">All Tasks</NavLink>
                </NavItem>
                
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu className="my-dropitems" right>
                    <DropdownItem>
                      Projects
                    </DropdownItem>
                    <DropdownItem>
                      Labels
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Filters
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav>
                <div className="input-group">
                  <i className="btn fa fa-search"></i>
                  <input type="text" className="form-control form-control-sm " placeholder="Search"/>
                </div>
              </Nav>
            </Collapse>
            
            </Navbar>
        )
    
}
export default MenuBar;