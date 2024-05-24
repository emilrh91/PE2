import PropTypes from "prop-types";
import StarRatings from 'react-star-ratings';

export const VenueReviews = ({ rating }) => {
  if (!rating) {
    return null;
  }

  return (
    <div className="venue-reviews">
      <div>
        <StarRatings
          rating={rating}
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="var(--primary-color)"
          isSelectable={false}
        />
      </div>
    </div>
  );
};

VenueReviews.propTypes = {
  rating: PropTypes.number,
};

VenueReviews.defaultProps = {
  rating: null,
};