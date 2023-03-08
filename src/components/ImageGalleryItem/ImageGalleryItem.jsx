import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ gallery, onSelectModalImage }) {
  return gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
    <GalleryItem key={id}>
      <GalleryItemImage
        id={id}
        src={webformatURL}
        alt={tags}
        onClick={() => onSelectModalImage(largeImageURL, tags)}
      />
    </GalleryItem>
  ));
}

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onSelectModalImage: PropTypes.func.isRequired,
};
