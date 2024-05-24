import PropTypes from 'prop-types';
import "./index.scss";

export const VenuePrice = ({ price }) => {
  return (
    <div className="venue-price">
      <h4>Price per night ${price}</h4>
    </div>
  );
};

VenuePrice.propTypes = {
  price: PropTypes.number.isRequired,
};