import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const EditProfile = ({ show, handleClose, profile, onSave }) => {
  const [newAvatar, setNewAvatar] = useState(profile.avatar.url);
  const [newBanner, setNewBanner] = useState(profile.banner.url);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      await onSave({
        avatar: { url: newAvatar, alt: "Avatar" },
        banner: { url: newBanner, alt: "Banner" },
      });
      handleClose();
    } catch (e) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group controlId="formAvatar">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new avatar URL"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBanner">
            <Form.Label>Banner URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new banner URL"
              value={newBanner}
              onChange={(e) => setNewBanner(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditProfile.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
