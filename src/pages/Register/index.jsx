import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../services/api';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import './index.scss';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarAlt, setAvatarAlt] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerAlt, setBannerAlt] = useState('');
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
  
    if (bio) userData.bio = bio;
    if (avatarUrl || avatarAlt) userData.avatar = { url: avatarUrl, alt: avatarAlt };
    if (bannerUrl || bannerAlt) userData.banner = { url: bannerUrl, alt: bannerAlt };
  
    apiServices.register(userData)
      .then(() => {
        return apiServices.login({ email, password });
      })
      .then(response => {
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        navigate('/'); 
      })
      .catch(error => {
        if (error.response) {
          setErrors(error.response.data.errors);
        } else {
          setErrors([{ message: "An unexpected error occurred. Please try again." }]);
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
                  <Form.Label>Name</Form.Label>
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

                <Form.Group controlId="formBio" className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
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

                <Form.Group controlId="formAvatarAlt" className="mb-3">
                  <Form.Label>Avatar Alt Text</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={avatarAlt} 
                    onChange={(e) => setAvatarAlt(e.target.value)} 
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

                <Form.Group controlId="formBannerAlt" className="mb-3">
                  <Form.Label>Banner Alt Text</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={bannerAlt} 
                    onChange={(e) => setBannerAlt(e.target.value)} 
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
