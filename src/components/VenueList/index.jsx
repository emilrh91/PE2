import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { VenueCard } from "../VenueCard";
import { apiServices } from "../../services/api";

export function VenueList({ searchText, numPersons, fromDate, toDate }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          _bookings: true,
          sort: 'created',
          sortOrder: 'desc'
        };
        const venuesResponse = await apiServices.getVenues(params);
        if (venuesResponse && venuesResponse.data && Array.isArray(venuesResponse.data)) {
          setVenues(venuesResponse.data);
        } else {
          setVenues([]);
        }
      } catch {
        setVenues([]);
      }
    };
    fetchData();
  }, []);

  const filteredVenues = venues.filter((venue) => {
    const matchesSearchText =
      (venue.name && venue.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (venue.location &&
        ((venue.location.address &&
          venue.location.address.toLowerCase().includes(searchText.toLowerCase())) ||
          (venue.location.city &&
            venue.location.city.toLowerCase().includes(searchText.toLowerCase())) ||
          (venue.location.zip &&
            venue.location.zip.toLowerCase().includes(searchText.toLowerCase())) ||
          (venue.location.country &&
            venue.location.country.toLowerCase().includes(searchText.toLowerCase()))));

    const matchesNumPersons = (numPersons !== "10+" && numPersons <= venue.maxGuests) ||
      (numPersons === "10+" && venue.maxGuests > 9);

    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    const isAvailable = venue.bookings.every(booking => {
      const bookingFromDate = new Date(booking.dateFrom);
      const bookingToDate = new Date(booking.dateTo);

      if (fromDateObj && toDateObj) {
        return toDateObj < bookingFromDate || fromDateObj > bookingToDate;
      } else if (fromDateObj) {
        return fromDateObj > bookingToDate;
      } else if (toDateObj) {
        return toDateObj < bookingFromDate;
      }

      return true;
    });

    return matchesSearchText && matchesNumPersons && isAvailable;
  });

  return (
    <Container>
      <Row>
        {filteredVenues.map((venue) => (
          <Col key={venue.id} xs={12} md={6}>
            <VenueCard venue={venue} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

VenueList.propTypes = {
  searchText: PropTypes.string,
  numPersons: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
};
