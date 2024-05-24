import { useState, useEffect } from "react";
import { Container, FormControl, Row, Col, Form } from "react-bootstrap";
import { VenueList } from "../../components/VenueList";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

export function Venues() {
  const [searchText, setSearchText] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleDateChange = (name, date) => {
    if (name === 'fromDate') {
      setFromDate(date);
      setToDate(null);
    } else if (name === 'toDate') {
      setToDate(date);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#search-field') {
      const element = document.getElementById('search-field');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const personOptions = [...Array(9).keys()].map((value) => ({
    value: value + 1,
    label: `${value + 1} ${value + 1 === 1 ? 'person' : 'persons'}`,
  })).concat({ value: '10+', label: '10+ persons' });

  return (
    <div className="Venues-Container">
      <Container>
        <div className="venuesHero">
          <h1 className="mb-2">Find Your Perfect Venue</h1>
          <p>
            Explore and book from a wide selection of venues for your next trip.
          </p>
        </div>
        <Row className="my-row">
          <Col xs={12} md={3} className="mb-3">
            <FormControl
              id="search-field"
              type="text"
              placeholder="Search for a venue..."
              onChange={(e) => setSearchText(e.target.value)}
              className="form-control"
            />
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Select
              aria-label="Number of persons"
              onChange={(e) => setNumPersons(e.target.value)}
              className="form-control"
              value={numPersons}
            >
              {personOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Group>
              <ReactDatePicker
                selected={fromDate}
                onChange={date => handleDateChange('fromDate', date)}
                minDate={new Date()}
                placeholderText="Select Start Date"
                className="form-control"
                customInput={<Form.Control />}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Group>
              <ReactDatePicker
                selected={toDate}
                onChange={date => handleDateChange('toDate', date)}
                minDate={fromDate || new Date()}
                placeholderText="Select End Date"
                disabled={!fromDate}
                className="form-control"
                customInput={<Form.Control />}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <VenueList
        searchText={searchText}
        numPersons={numPersons}
        fromDate={fromDate}
        toDate={toDate}
      />
    </div>
  );
}
