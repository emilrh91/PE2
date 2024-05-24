import { useEffect, useState } from 'react';
import { apiServices } from '../../services/api';
import { PopularVenues } from "../../components/PopularVenues";
import { LandingPageHeroComponent } from "../../components/LandingPageHeroComponent";
import './index.scss';
import { Container, Row, Col } from 'react-bootstrap';

export function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    apiServices.getVenues().then(response => {
      setVenues(response.data);
    });
  }, []);

  return (
    <div className="home-container">
      <Container className="hero-container">
        <LandingPageHeroComponent />
      </Container>
      <Container className="venues-container">
        <Container>
          <Row>
            <Col>
              <h3 className="popular-venues-title">Popular Venues:</h3>
            </Col>
          </Row>
          <PopularVenues venues={venues} />
        </Container>
      </Container>
    </div>
  );
}
