import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { apiServices } from '../../services/api';
import { VenueCard } from '../VenueCard';

export function PopularVenues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    apiServices.getVenues().then(response => {
      const sortedVenues = response.data.sort((a, b) => b._count.bookings - a._count.bookings);
      setVenues(sortedVenues.slice(0, 9));
    });
  }, []);

  return (
    <Container>
      <Row>
        {venues.map(venue => (
          <Col key={venue.id} xs={12} md={6}>
            <VenueCard venue={venue} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
