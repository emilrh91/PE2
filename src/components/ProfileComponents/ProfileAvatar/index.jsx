import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import './index.scss';

export const ProfileAvatar = ({ avatar }) => {
  return (
    <div className="profile-avatar">
      <Image src={avatar.url} alt={avatar.alt} roundedCircle className="img-fluid" />
    </div>
  );
};

ProfileAvatar.propTypes = {
  avatar: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string
  }).isRequired,
};
