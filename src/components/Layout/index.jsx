import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { NavbarComponent } from '../NavbarComponent';
import { FooterComponent } from '../FooterComponent';

export function Layout({ children, isLoggedIn, userRole, setIsLoggedIn, setUserRole, handleShowLogin, handleLogout }) {
  return (
    <>
      <NavbarComponent isLoggedIn={isLoggedIn} userRole={userRole} setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} handleShowLogin={handleShowLogin} handleLogout={handleLogout} />
      <Container className="main-content">
        {children}
      </Container>
      <FooterComponent isLoggedIn={isLoggedIn} handleShowLogin={handleShowLogin} setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
  handleShowLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
