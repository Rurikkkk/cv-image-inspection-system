import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import AlertCard from './AlertCard';
import config from '../../config';

export default function AlertsGallery() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`${config.backendUrl}/api/images/images`)
            .then(r => r.ok ? r.json() : [])
            .then(setData)
            .catch(() => setData([]));
    }, []);
    const pureData = data.filter((x) => x.alerts && x.alerts.length > 0 && x.alerts[0]);

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Фото с предупреждениями</Typography>
            <Grid container spacing={3} alignItems="stretch">
                {pureData.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
                        <AlertCard
                            file={{ ...file, markupedUrl: `${config.backendUrl}/data/markuped_images/${file.markuped}` }}
                            onOpenMarkup={() => window.open(`${config.backendUrl}/data/markuped_images/${file.markuped}`, '_blank')}
                            showAlerts={true}
                            showViewed={true}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
