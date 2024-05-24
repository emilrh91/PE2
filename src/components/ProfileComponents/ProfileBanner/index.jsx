import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import './index.scss';

export const ProfileBanner = ({ banner }) => {
  return (
    <div className="profile-banner">
      <Image src={banner.url} alt={banner.alt} fluid />
    </div>
  );
};

ProfileBanner.propTypes = {
  banner: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string
  }).isRequired,
};
