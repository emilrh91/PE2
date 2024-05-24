import PropTypes from 'prop-types';
import './index.scss';

export const ProfileInfo = ({ name, email }) => {
  return (
    <div className="profile-info">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
