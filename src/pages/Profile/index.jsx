import { useEffect, useState } from "react";
import { apiServices } from "../../services/api";
import { Container, Row, Col, Spinner, Button, Alert } from "react-bootstrap";
import { ProfileBanner } from "../../components/ProfileComponents/ProfileBanner";
import { ProfileAvatar } from "../../components/ProfileComponents/ProfileAvatar";
import { ProfileInfo } from "../../components/ProfileComponents/ProfileInfo";
import { ProfileBookings } from "../../components/ProfileComponents/ProfileBookings";
import { VenueManagerInfo } from "../../components/ProfileComponents/VenueManagerInfo";
import { EditVenue } from "../../components/ProfileComponents/EditVenue";
import { EditBooking } from "../../components/ProfileComponents/EditBooking";
import { EditProfile } from "../../components/ProfileComponents/EditProfile";
import "./index.scss";

export const Profile = () => {
  const [profile, setProfile] = useState({
    banner: { url: '', alt: '' },
    avatar: { url: '', alt: '' },
    name: '',
    email: '',
    bookings: [],
    venues: [],
    venueManager: false,
  });
  const [showEditVenueModal, setShowEditVenueModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const name = localStorage.getItem("userName");
        const includeBookings = true;

        const [profileResponse, venuesResponse] = await Promise.all([
          apiServices.getProfile(name, includeBookings),
          apiServices.getVenuesWithBookings(name)
        ]);

        setProfile({
          ...profileResponse.data,
          venues: venuesResponse.data,
        });
      } catch (error) {
        setError("Error fetching profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowEditVenueModal(true);
  };

  const handleSaveVenue = (updatedVenue) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      venues: prevProfile.venues.map((venue) =>
        venue.id === updatedVenue.id ? updatedVenue : venue
      ),
    }));
  };

  const handleDeleteVenue = (venueId) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      venues: prevProfile.venues.filter((venue) => venue.id !== venueId),
    }));
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowEditBookingModal(true);
  };

  const handleSaveBooking = (updatedBooking) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      bookings: prevProfile.bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      ),
    }));
  };

  const handleDeleteBooking = (bookingId) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      bookings: prevProfile.bookings.filter((booking) => booking.id !== bookingId),
    }));
  };

  const handleProfileSave = async (updatedProfile) => {
    const name = localStorage.getItem("userName");
    try {
      const response = await apiServices.updateProfile(name, updatedProfile);
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: response.data.avatar,
        banner: response.data.banner
      }));
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  if (!profile.name) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    );
  }

  return (
    <Container className="profileContainer">
      <Row className="profileRow">
        <Col className="profileDetails">
          {profile.banner.url && <ProfileBanner banner={profile.banner} />}
          {profile.avatar.url && <ProfileAvatar avatar={profile.avatar} />}
          {profile.name && profile.email && (
            <ProfileInfo name={profile.name} email={profile.email} />
          )}
          <Button variant="primary" onClick={() => setShowEditProfileModal(true)}>Edit Profile</Button>
        </Col>
      </Row>
      <Row className="profileRow">
        <Col>
          <ProfileBookings bookings={profile.bookings} onEditBooking={handleEditBooking} />
        </Col>
        {profile.venueManager && (
          <Col>
            <VenueManagerInfo
              venues={profile.venues}
              onEditVenue={handleEditVenue}
            />
          </Col>
        )}
      </Row>
      {selectedVenue && (
        <EditVenue
          show={showEditVenueModal}
          handleClose={() => setShowEditVenueModal(false)}
          venue={selectedVenue}
          onSave={handleSaveVenue}
          onDelete={handleDeleteVenue}
        />
      )}
      {selectedBooking && (
        <EditBooking
          show={showEditBookingModal}
          handleClose={() => setShowEditBookingModal(false)}
          booking={selectedBooking}
          onSave={handleSaveBooking}
          onDelete={handleDeleteBooking}
        />
      )}
      <EditProfile
        show={showEditProfileModal}
        handleClose={() => setShowEditProfileModal(false)}
        profile={profile}
        onSave={handleProfileSave}
      />
    </Container>
  );
};
