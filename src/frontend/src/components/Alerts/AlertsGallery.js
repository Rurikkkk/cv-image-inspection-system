import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import AlertCard from './AlertCard';
import config from '../../config';
import { fetchAlertsImages } from '../../api/galleryApi';

export default function AlertsGallery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        setLoading(true);
        setError('');
        fetchAlertsImages()
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Фото с предупреждениями</Typography>
            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={3} alignItems="stretch">
                {data.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
                        <AlertCard
                            file={{ ...file, markupedUrl: `${config.backendUrl}/api/images/image/markuped_images/${file.markuped}` }}
                            onOpenMarkup={() => window.open(`${config.backendUrl}/api/images/image/markuped_images/${file.markuped}`, '_blank')}
                            showAlerts={true}
                            showViewed={true}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
