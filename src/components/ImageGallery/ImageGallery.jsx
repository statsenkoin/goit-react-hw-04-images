import React from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components';

export function ImageGallery({ gallery, onSelectModalImage }) {
  return (
    <Gallery>
      <ImageGalleryItem
        gallery={gallery}
        onSelectModalImage={onSelectModalImage}
      ></ImageGalleryItem>
    </Gallery>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onSelectModalImage: PropTypes.func.isRequired,
};
