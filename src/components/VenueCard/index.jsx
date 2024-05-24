import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaMapPin, FaBed } from "react-icons/fa";
import { useState } from "react";
import { Link } from 'react-router-dom';
import './index.scss';

export function VenueCard({ venue }) {
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    setImageFailed(true);
  };

  return (
    <Link to={`/venue/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="mb-3 venue-card">
        <Row className="g-0">
          <Col md={4}>
            {venue.media.length > 0 && !imageFailed ? (
              <Card.Img
                className="object-cover"
                src={venue.media[0].url}
                alt={venue.media[0].alt || "Venue image"}
                style={{ height: "150px", objectFit: "cover" }}
                onError={handleImageError}
              />
            ) : (
              <div className="holidaze-logo">HOLIDAZE</div>
            )}
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{venue.name}</Card.Title>
              <Card.Text>
                <FaMapPin /> {venue.location.city || "No city provided"}
                <span className="px-2"></span>
                <FaBed /> {venue.maxGuests}
              </Card.Text>
              <div className="button-container">
                <Card.Text className="price-text">${venue.price} per night</Card.Text>
                <Button variant="primary">Book Now</Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string,
    }).isRequired,
    maxGuests: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
