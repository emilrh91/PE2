import { useState } from 'react';
import { Modal, Spinner, Alert, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../services/api';

export const LoginModal = ({ show, handleClose, setIsLoggedIn, setUserRole }) => {
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
        handleClose();
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(error => {
        const apiErrorMessage = error.response?.data?.errors?.[0]?.message || 'An error occurred during login.';
        setErrorMessage(apiErrorMessage);
        setLoading(false);
      });
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
};
