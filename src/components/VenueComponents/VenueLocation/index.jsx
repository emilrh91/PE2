import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "./index.scss";

export const VenueLocation = ({ location }) => (
  <div className="venue-location">
    <h2><FaMapMarkerAlt /> {location.city}</h2>
  </div>
);

VenueLocation.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
};