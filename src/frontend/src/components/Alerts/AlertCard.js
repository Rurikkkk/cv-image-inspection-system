import React from 'react';
import UnifiedCard from '../UnifiedCard';
import PhotoPreviewer from '../PhotoPreviewer';

export default function AlertCard(props) {
    const storageKey = `status-${props.file?.source}`;
    const [viewed, setViewed] = React.useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : false;
    });
    const [openPreview, setOpenPreview] = React.useState(false);
    const handleOpen = () => {
        setOpenPreview(true);
        if (!viewed) {
            setViewed(true);
            localStorage.setItem(storageKey, JSON.stringify(true));
        }
    };
    const handleClose = () => setOpenPreview(false);

    return <>
        <UnifiedCard {...props} file={props.file} onOpen={handleOpen} showViewed={true} viewed={viewed} />
        <PhotoPreviewer open={openPreview} onClose={handleClose} src={props.file?.srcUrl || props.file?.markupedUrl} alt={props.file?.source} />
    </>;
}
