import { useState } from "react";
import { apiServices } from "../../services/api";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import "./index.scss";

export function ManageVenues() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "" }],
    price: 0,
    maxGuests: 0,
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: { address: "", city: "", zip: "", country: "", continent: "" },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    const keys = name.split('.');

    setVenueData(prev => {
      const newState = { ...prev };
      let ref = newState;
      keys.slice(0, -1).forEach(key => {
        if (Array.isArray(ref[key])) {
          ref[key] = [...ref[key]];
        } else {
          ref[key] = { ...ref[key] };
        }
        ref = ref[key];
      });
      ref[keys[keys.length - 1]] = newValue;
      return newState;
    });
  };

  const addMedia = () => {
    setVenueData(prev => ({
      ...prev,
      media: [...prev.media, { url: "" }]
    }));
  };

  const removeMedia = (index) => {
    setVenueData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await apiServices.createVenue(venueData);
      if (result.success) {
        setSuccessMessage("Venue created successfully!");
        setVenueData({
          name: "",
          description: "",
          media: [{ url: "" }],
          price: 0,
          maxGuests: 0,
          meta: { wifi: false, parking: false, breakfast: false, pets: false },
          location: { address: "", city: "", zip: "", country: "", continent: "" },
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="formContainer manageVenues">
      <h1 className="text-center">Add a Venue</h1>
      {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h4 className="general-info-title">General Information</h4>
            <Form.Group controlId="venueName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={venueData.name} onChange={handleChange} placeholder="Name" required />
            </Form.Group>
            <Form.Group controlId="venueDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={venueData.description} onChange={handleChange} placeholder="Description" rows={3} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <h4 className="media-title">Media</h4>
            {venueData.media.map((mediaItem, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  name={`media.${index}.url`}
                  value={mediaItem.url}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="flex-grow-1 me-2"
                  required
                />
                <Button variant="danger" onClick={() => removeMedia(index)}>Remove</Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addMedia} className="mb-3">Add Image</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 className="pricing-title">Pricing and Guests</h4>
            <Form.Group controlId="venuePrice">
              <Form.Label>Price per Night ($)</Form.Label>
              <Form.Control type="number" name="price" value={venueData.price} onChange={handleChange} placeholder="Price per Night" className="no-spinner" required />
            </Form.Group>
            <Form.Group controlId="venueMaxGuests">
              <Form.Label>Max Guests</Form.Label>
              <Form.Control type="number" name="maxGuests" value={venueData.maxGuests} onChange={handleChange} placeholder="Max Guests" className="no-spinner" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <h4 className="amenities-title">Amenities</h4>
            <Form.Check type="checkbox" label="Wifi" name="meta.wifi" checked={venueData.meta.wifi} onChange={handleChange} />
            <Form.Check type="checkbox" label="Parking" name="meta.parking" checked={venueData.meta.parking} onChange={handleChange} />
            <Form.Check type="checkbox" label="Breakfast" name="meta.breakfast" checked={venueData.meta.breakfast} onChange={handleChange} />
            <Form.Check type="checkbox" label="Pets" name="meta.pets" checked={venueData.meta.pets} onChange={handleChange} />
          </Col>
        </Row>
        <h4 className="location-title">Location</h4>
        <Row>
          <Col md={6}>
            <Form.Group controlId="venueAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="location.address" value={venueData.location.address} onChange={handleChange} placeholder="Address" required />
            </Form.Group>
            <Form.Group controlId="venueCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="location.city" value={venueData.location.city} onChange={handleChange} placeholder="City" required />
            </Form.Group>
            <Form.Group controlId="venueZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" name="location.zip" value={venueData.location.zip} onChange={handleChange} placeholder="Zip" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="venueCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="location.country" value={venueData.location.country} onChange={handleChange} placeholder="Country" required />
            </Form.Group>
            <Form.Group controlId="venueContinent">
              <Form.Label>Continent</Form.Label>
              <Form.Control type="text" name="location.continent" value={venueData.location.continent} onChange={handleChange} placeholder="Continent" required />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-4" disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Add Venue"}
        </Button>
      </Form>
    </Container>
  );
}
