import PropTypes from "prop-types";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

export const ImageCarousel = ({ images }) => {
  const transformedImages = images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
  }));

  return (
    <div>
      <ImageGallery items={transformedImages} showPlayButton={false} />
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};