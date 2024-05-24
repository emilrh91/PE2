import { Card, Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./index.scss";

export const VenueManagerInfo = ({ venues, onEditVenue }) => {
  return (
    <div className="venue-manager-info">
      <h2>My Venues</h2>
      {venues.map((venue, index) => (
        <Card key={index} className="mb-3 venue-info">
          <Card.Body>
            <Card.Title>{venue.name}</Card.Title>
            <Card.Text>{venue.description}</Card.Text>
            <Button variant="primary" onClick={() => onEditVenue(venue)}>
              Edit
            </Button>
            <Card.Text className="mt-3"><strong>Active Bookings:</strong></Card.Text>
            {venue.bookings && venue.bookings.length > 0 ? (
              <ListGroup>
                {venue.bookings.map((booking, bookingIndex) => (
                  <ListGroup.Item key={bookingIndex}>
                    {`From ${new Date(booking.dateFrom).toLocaleDateString()} to ${new Date(booking.dateTo).toLocaleDateString()}, Guests: ${booking.guests}`}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Card.Text>No active bookings</Card.Text>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

VenueManagerInfo.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          dateFrom: PropTypes.string.isRequired,
          dateTo: PropTypes.string.isRequired,
          guests: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
  onEditVenue: PropTypes.func.isRequired,
};
