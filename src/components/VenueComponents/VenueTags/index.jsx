import PropTypes from 'prop-types';
import { FaWifi, FaParking, FaCoffee, FaDog } from 'react-icons/fa';

const ICONS = {
  wifi: FaWifi,
  parking: FaParking,
  breakfast: FaCoffee,
  pets: FaDog,
};

export const VenueTags = ({ meta }) => {
  if (!meta) {
    return null;
  }

  return (
    <div className="venue-tags">
      {Object.entries(meta).map(([key, value]) => {
        const Icon = ICONS[key];
        return (
          <div key={key} className="tag">
            <Icon />
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Yes' : 'No'}</span>
          </div>
        );
      })}
    </div>
  );
};

VenueTags.propTypes = {
  meta: PropTypes.shape({
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    breakfast: PropTypes.bool,
    pets: PropTypes.bool,
  }),
};

VenueTags.defaultProps = {
  meta: null,
};