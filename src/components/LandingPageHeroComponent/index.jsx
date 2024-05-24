import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './index.scss';

export function LandingPageHeroComponent() {
  const navigate = useNavigate(); 

  const handleSearchClick = () => {
    navigate('/venues#search-field');
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Discover Your Perfect Getaway with Holidaze</h1>
        </Col>
        <Col>
          <p className="styled-p">Explore our top destinations and find your dream venue.</p>
          <Button className="btn-primary" variant="primary" onClick={handleSearchClick}>Search</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <img className="styled-img" src="https://source.unsplash.com/a-house-on-the-shore-of-a-beach-OaR37pXmtOA" alt="Hero image" />
        </Col>
      </Row>
    </Container>
  );
}
