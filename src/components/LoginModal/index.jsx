import { useState } from 'react';
import { Modal, Spinner, Alert, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../services/api';

export const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole, isModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const loginData = { email, password };
    apiServices.login(loginData)
      .then(data => {
        if (!data) {
          throw new Error('Server response does not contain data');
        }

        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('userId', data.email);
        localStorage.setItem('venueManager', data.venueManager);

        setUserRole(data.venueManager ? 'venueManager' : 'user');
        return apiServices.createApiKey();
      })
      .then(response => {
        localStorage.setItem('apiKey', response.data.key);
        if (handleClose) handleClose();
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(error => {
        let apiErrorMessage = 'An error occurred during login.';
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            apiErrorMessage = error.response.data.errors.map(err => err.message).join(', ');
          } else if (error.response.data.message) {
            apiErrorMessage = error.response.data.message;
          }
        } else if (error.message) {
          apiErrorMessage = error.message;
        }
        setErrorMessage(apiErrorMessage);
        setLoading(false);
      });
  };

  const handleRegister = () => {
    if (handleClose) handleClose();
    navigate('/register');
  };

  const loginForm = (
    <div className="login-container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="secondary" onClick={handleRegister}>
              Register new user
            </Button>
          </div>
        )}
      </Form>
    </div>
  );

  if (isModal) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginForm}
        </Modal.Body>
      </Modal>
    );
  }

  return loginForm;
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
  isModal: PropTypes.bool
};

LoginModal.defaultProps = {
  isModal: true
};
