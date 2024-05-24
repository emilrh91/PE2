import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { apiServices } from "../../services/api";
import { Container, Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import "./index.scss";

export const Register = ({ setIsLoggedIn, setUserRole }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      venueManager,
    };

    if (avatarUrl) userData.avatar = { url: avatarUrl };
    if (bannerUrl) userData.banner = { url: bannerUrl };

    apiServices.register(userData)
      .then(() => apiServices.login({ email, password }))
      .then(response => {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('userId', response.email);
        localStorage.setItem('venueManager', response.venueManager);
        setIsLoggedIn(true);
        setUserRole(response.venueManager ? 'venueManager' : 'user');
        return apiServices.createApiKey();
      })
      .then(apiKeyResponse => {
        localStorage.setItem('apiKey', apiKeyResponse.data.key);
        navigate('/');
      })
      .catch(error => {
        if (error.response) {
          setErrors(error.response.data.errors);
        } else {
          setErrors([{ message: error.message || "An unexpected error occurred. Please try again." }]);
        }
      });
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              {errors.length > 0 && (
                <Alert variant="danger">
                  {errors.map((error, index) => (
                    <p key={index}>{error.message}</p>
                  ))}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

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

                <Form.Group controlId="formAvatarUrl" className="mb-3">
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBannerUrl" className="mb-3">
                  <Form.Label>Banner URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formVenueManager" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Venue Manager"
                    checked={venueManager}
                    onChange={(e) => setVenueManager(e.target.checked)}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
};
