import React from 'react';
import PropTypes from 'prop-types';
import UnifiedCard from '../UnifiedCard';
import PhotoPreviewer from '../PhotoPreviewer';

export default function GalleryCard(props) {
  const [openPreview, setOpenPreview] = React.useState(false);
  const handleOpen = () => setOpenPreview(true);
  const handleClose = () => setOpenPreview(false);
  return <>
    <UnifiedCard {...props} file={props.file} onOpen={handleOpen} showViewed={false} />
    <PhotoPreviewer open={openPreview} onClose={handleClose} src={props.file?.srcUrl || props.file?.markupedUrl} alt={props.file?.source} />
  </>;
}

GalleryCard.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};