import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { apiServices } from "../../../services/api";
import "./index.scss";

export const EditVenue = ({ show, handleClose, venue, onSave, onDelete }) => {
  const [venueData, setVenueData] = useState(venue);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setVenueData(venue);
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;
    if (name === 'price' || name === 'maxGuests') {
      parsedValue = parseFloat(value);
    }

    setVenueData({
      ...venueData,
      [name]: parsedValue,
    });
  };

  const handleMetaChange = (e) => {
    const { name, checked } = e.target;
    setVenueData({
      ...venueData,
      meta: {
        ...venueData.meta,
        [name]: checked,
      },
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      location: {
        ...venueData.location,
        [name]: value,
      },
    });
  };

  const handleAddMedia = () => {
    setVenueData({
      ...venueData,
      media: [...venueData.media, { url: '', alt: '' }],
    });
  };

  const handleRemoveMedia = (index) => {
    const newMedia = venueData.media.filter((_, i) => i !== index);
    setVenueData({ ...venueData, media: newMedia });
  };

  const handleMediaChange = (index, field, value) => {
    const newMedia = [...venueData.media];
    newMedia[index][field] = value;
    setVenueData({ ...venueData, media: newMedia });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    apiServices
      .updateVenue(venueData.id, venueData)
      .then((response) => {
        onSave(response.data);
        handleClose();
      })
      .catch((error) => {
        const apiErrorMessage = error.response?.data?.errors?.[0]?.message || 'An error occurred while updating the venue.';
        setErrorMessage(apiErrorMessage);
      });
  };

  const handleDelete = () => {
    apiServices
      .deleteVenue(venueData.id)
      .then(() => {
        onDelete(venueData.id);
        handleClose();
      })
      .catch((error) => {
        const apiErrorMessage = error.response?.data?.errors?.[0]?.message || 'An error occurred while deleting the venue.';
        setErrorMessage(apiErrorMessage);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={venueData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price per Night $</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={venueData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMaxGuests">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control
              type="number"
              name="maxGuests"
              value={venueData.maxGuests}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMedia">
            <Form.Label>Media</Form.Label>
            {venueData.media.map((mediaItem, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control
                    type="text"
                    name="url"
                    placeholder="Image URL"
                    value={mediaItem.url}
                    onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="alt"
                    placeholder="Image Alt Text"
                    value={mediaItem.alt}
                    onChange={(e) => handleMediaChange(index, 'alt', e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="danger" onClick={() => handleRemoveMedia(index)}>Remove</Button>
                </Col>
              </Row>
            ))}
            <Button variant="secondary" onClick={handleAddMedia}>Add Media</Button>
          </Form.Group>
          <Form.Group controlId="formMeta">
            <Form.Label>Meta</Form.Label>
            <Form.Check
              type="checkbox"
              label="WiFi"
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleMetaChange}
            />
            <Form.Check
              type="checkbox"
              label="Parking"
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleMetaChange}
            />
            <Form.Check
              type="checkbox"
              label="Breakfast"
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleMetaChange}
            />
            <Form.Check
              type="checkbox"
              label="Pets"
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleMetaChange}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              value={venueData.location.address}
              onChange={handleLocationChange}
              className="mb-2"
            />
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={venueData.location.city}
              onChange={handleLocationChange}
              className="mb-2"
            />
            <Form.Control
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={venueData.location.zip}
              onChange={handleLocationChange}
              className="mb-2"
            />
            <Form.Control
              type="text"
              name="country"
              placeholder="Country"
              value={venueData.location.country}
              onChange={handleLocationChange}
              className="mb-2"
            />
            <Form.Control
              type="text"
              name="continent"
              placeholder="Continent"
              value={venueData.location.continent}
              onChange={handleLocationChange}
              className="mb-2"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleDelete} className="mt-3 ms-2">
            Delete Venue
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditVenue.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
