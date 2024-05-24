import PropTypes from "prop-types";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const ProfileBookings = ({ bookings, onEditBooking }) => {
  const navigate = useNavigate();

  if (!bookings) {
    return <div>Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return <div>No bookings found.</div>;
  }

  return (
    <div className="profile-bookings">
      <h2>My Bookings</h2>
      {bookings.map((booking, index) => (
        <Card key={index} className="booking">
          <Card.Header>
            <span
              className="venue-link"
              onClick={() => navigate(`/venue/${booking.venue.id}`)}
            >
              {booking.venue ? `${booking.venue.name}, ${booking.venue.location.city}` : "No venue"}
            </span>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <label>
                From {new Date(booking.dateFrom).toLocaleDateString()}
              </label>
            </ListGroup.Item>
            <ListGroup.Item>
              <label>To {new Date(booking.dateTo).toLocaleDateString()}</label>
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant="primary"
            onClick={() => onEditBooking(booking)}
          >
            Edit
          </Button>
        </Card>
      ))}
    </div>
  );
};

ProfileBookings.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      venue: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        location: PropTypes.shape({
          city: PropTypes.string,
        }),
      }),
      dateFrom: PropTypes.string,
      dateTo: PropTypes.string,
    })
  ).isRequired,
  onEditBooking: PropTypes.func.isRequired,
};
