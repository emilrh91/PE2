import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useLogout } from "../../services/auth";
import "./index.scss";

export function NavbarComponent({ isLoggedIn, userRole, setIsLoggedIn, setUserRole, handleShowLogin }) {
  const location = useLocation();

  const handleLogout = useLogout(() => {
    setIsLoggedIn(false);
    setUserRole('');
  });

  return (
    <Navbar expand="lg" fixed="top" className="NavbarComponent">
      <Container className="navbar-container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
        <Navbar.Brand className="holidazeLogo holidazeLogo-Navbar order-1 mx-auto">
          <LinkContainer to="/">
            <Nav.Link active={location.pathname === "/"}>HOLIDAZE</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="order-2">
          <Nav className="me-auto">
            <LinkContainer to="/venues">
              <Nav.Link active={location.pathname === "/venues"}>Venues</Nav.Link>
            </LinkContainer>
            {userRole === 'venueManager' && (
              <LinkContainer to="/manage-venues">
                <Nav.Link active={location.pathname === "/manage-venues"}>Add Venue</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link active={location.pathname === "/profile"}>My Profile</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavbarComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
  handleShowLogin: PropTypes.func.isRequired,
};
