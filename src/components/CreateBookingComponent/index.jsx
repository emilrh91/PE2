import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiServices } from "../../services/api";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'react-bootstrap';
import "./index.scss";

export const CreateBooking = ({ venueId, isLoggedIn, handleShowLogin }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    apiServices.getVenue(venueId).then((response) => {
      if (response && response.data) {
        if (response.data.bookings && response.data.bookings.length > 0) {
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
        setVenue(response.data);
      }
    }).catch(() => {
      alert("Failed to fetch venue details.");
    });
  }, [venueId]);

  const findNextBooking = (date) => {
    const nextBookings = bookedDates.filter(
      (bookingDate) => bookingDate > date
    );
    if (nextBookings.length > 0) {
      return new Date(Math.min.apply(null, nextBookings));
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      handleShowLogin();
      return;
    }
    if (startDate && endDate && guests && guests > 0) {
      const bookingData = {
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: Number(guests),
        venueId: venueId
      };

      apiServices.createBooking(bookingData)
        .then(response => {
          if (response.success) {
            alert("Booking created successfully!");
          } else {
            alert("Failed to create booking: " + response.message);
          }
        })
        .catch(() => {
          alert("An error occurred while creating the booking.");
        });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <div className="create-booking">
      <h3>{isLoggedIn ? "Create Booking" : "Log In to Create Booking"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="booking-field">
          <label>Start Date:</label>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setEndDate(null);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDates={bookedDates}
            className="form-control"
          />
          <label>End Date:</label>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={findNextBooking(startDate)}
            excludeDates={bookedDates}
            className="form-control"
          />
        </div>
        <div className="booking-field">
          <label>Guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="form-control"
            min="1"
            max={venue ? venue.maxGuests : 0}
          />
        </div>
        <Button className="submit-button" type="submit">
          {isLoggedIn ? "Create Booking" : "Log In"}
        </Button>
      </form>
    </div>
  );
};

CreateBooking.propTypes = {
  venueId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleShowLogin: PropTypes.func.isRequired,
};
