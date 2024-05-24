import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { apiServices } from '../../../services/api';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const EditBooking = ({ show, handleClose, booking, onSave, onDelete }) => {
  const [bookingData, setBookingData] = useState(booking);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    setBookingData(booking);
    if (booking && booking.venue) {
      apiServices.getVenue(booking.venue.id).then((response) => {
        if (response && response.data && response.data.bookings) {
          const dates = response.data.bookings.map((booking) => {
            const start = new Date(booking.dateFrom);
            const end = new Date(booking.dateTo);
            const dates = [];
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              dates.push(new Date(d));
            }
            return dates;
          }).flat();
          setBookedDates(dates);
        }
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiServices.updateBooking(bookingData.id, bookingData)
      .then((response) => {
        onSave({ ...response.data, venue: booking.venue });
        handleClose();
      });
  };

  const handleDelete = () => {
    apiServices.deleteBooking(bookingData.id)
      .then(() => {
        onDelete(bookingData.id);
        handleClose();
      });
  };

  const findNextBooking = (date) => {
    const nextBookings = bookedDates.filter(
      (bookingDate) => bookingDate > date
    );
    if (nextBookings.length > 0) {
      return new Date(Math.min.apply(null, nextBookings));
    }
    return null;
  };

  if (!booking || !booking.venue) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDateFrom">
            <Form.Label>Date From</Form.Label>
            <ReactDatePicker
              selected={new Date(bookingData.dateFrom)}
              onChange={(date) => setBookingData({
                ...bookingData,
                dateFrom: date.toISOString(),
                dateTo: bookingData.dateTo && new Date(bookingData.dateTo) < date ? date.toISOString() : bookingData.dateTo,
              })}
              selectsStart
              startDate={new Date(bookingData.dateFrom)}
              endDate={new Date(bookingData.dateTo)}
              minDate={new Date()}
              excludeDates={bookedDates}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formDateTo">
            <Form.Label>Date To</Form.Label>
            <ReactDatePicker
              selected={new Date(bookingData.dateTo)}
              onChange={(date) => setBookingData({ ...bookingData, dateTo: date.toISOString() })}
              selectsEnd
              startDate={new Date(bookingData.dateFrom)}
              endDate={new Date(bookingData.dateTo)}
              minDate={new Date(bookingData.dateFrom)}
              maxDate={findNextBooking(new Date(bookingData.dateFrom))}
              excludeDates={bookedDates}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formGuests">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              type="number"
              name="guests"
              value={bookingData.guests}
              onChange={handleChange}
              className="form-control"
              min="1"
              max={booking.venue.maxGuests}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleDelete} className="ml-2">
            Delete Booking
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditBooking.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
