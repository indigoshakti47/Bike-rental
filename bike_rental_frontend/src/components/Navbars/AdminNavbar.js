import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../actions/auth";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = () => {

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutAction());
  };

  const user = useSelector(state => state.auth.user);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <span className="h4 ml-4 mb-0 text-white text-uppercase d-lg-inline-block">
           FASTLY
          </span>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/korra.jpeg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logOut}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
