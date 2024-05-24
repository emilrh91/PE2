import PropTypes from 'prop-types';
import "./index.scss";

export const VenueDescription = ({ description }) => {
  return <p className="venue-description">Description:<br /> {description}</p>;
};

VenueDescription.propTypes = {
  description: PropTypes.string.isRequired,
};