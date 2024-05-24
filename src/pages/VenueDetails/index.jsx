import { useEffect, useState } from 'react';
import { apiServices } from '../../services/api';
import { VenueHeader } from '../../components/VenueComponents/VenueHeader';
import { VenueTags } from '../../components/VenueComponents/VenueTags';
import { ImageCarousel } from '../../components/VenueComponents/ImageCarousel';
import { VenueLocation } from '../../components/VenueComponents/VenueLocation';
import { VenuePrice } from '../../components/VenueComponents/VenuePrice';
import { VenueReviews } from '../../components/VenueComponents/VenueReviews';
import { VenueDescription } from '../../components/VenueComponents/VenueDescription'; 
import { CreateBooking } from '../../components/CreateBookingComponent'; 
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./index.scss";

export const VenueDetails = ({ isLoggedIn, handleShowLogin }) => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await apiServices.getVenue(venueId);
        setVenue(response.data);
      } catch (error) {
        setError("Failed to fetch venue details.");
      }
    };
    fetchVenue();
  }, [venueId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!venue) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="venue-page">
      <VenueHeader name={venue.name} className="mb-4" />
      <Row>
        <Col lg={6} className="mb-4 mb-lg-0">
          <ImageCarousel images={venue.media} />
        </Col>
        <Col lg={6}>
          <div className="venue-info">
            <VenueLocation location={venue.location} maxGuests={venue.maxGuests} bathrooms={venue.bathrooms} className="mb-3" />
            <VenueTags meta={venue.meta} className="mb-3" />
            <VenueDescription description={venue.description} className="mb-3" />
            <VenuePrice price={venue.price} className="mb-3" />
            <VenueReviews rating={venue.rating} className="mb-3" />
            <CreateBooking venueId={venueId} isLoggedIn={isLoggedIn} handleShowLogin={handleShowLogin} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

VenueDetails.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleShowLogin: PropTypes.func.isRequired,
};
