import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

export default function GalleryCard({ file, onOpenMarkup }) {
    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ p: 0, minHeight: 180, bgcolor: 'background.paper', borderTopLeftRadius: 4, borderTopRightRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={file.srcUrl}
                    alt={file.source}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>{file.source}</Typography>
            </CardContent>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <Button size="small" variant="contained" sx={{ borderRadius: 4, width: '100%' }} onClick={onOpenMarkup}>
                    Открыть разметку
                </Button>
            </CardActions>
        </Card>
    );
}
