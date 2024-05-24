import { Container, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
import "./index.scss";

export function FooterComponent({ isLoggedIn, handleShowLogin }) {
  return (
    <footer className="footerComponent mt-auto py-3 pt-5 pb-5">
      <Container>
        <Row>
          <Col className="text-center">
            <LinkContainer to="/venues">
              <Nav.Link>Explore Venues</Nav.Link>
            </LinkContainer>
          </Col>
          <Col className="text-center">
            <span className="holidazeLogo footer-holidazeLogo">&copy; HOLIDAZE</span>
          </Col>
          <Col className="text-center">
            {isLoggedIn ? (
              <LinkContainer to="/profile">
                <Nav.Link>My Profile</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            )}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

FooterComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleShowLogin: PropTypes.func.isRequired,
};
