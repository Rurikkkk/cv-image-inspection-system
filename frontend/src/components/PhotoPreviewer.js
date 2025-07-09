import React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

export default function PhotoPreviewer({ open, onClose, src, alt }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" PaperProps={{ style: { background: 'rgba(0,0,0,0.85)', boxShadow: 'none' } }}>
            <Box sx={{ position: 'relative', width: { xs: '90vw', md: '70vw' }, height: { xs: '60vw', md: '70vh' }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'transparent' }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 2 }}>
                    <CloseIcon />
                </IconButton>
                <img
                    src={src}
                    alt={alt}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8, boxShadow: '0 4px 32px rgba(0,0,0,0.5)' }}
                />
            </Box>
        </Dialog>
    );
}
