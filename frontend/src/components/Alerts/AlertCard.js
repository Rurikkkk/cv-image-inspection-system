import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid, Chip } from '@mui/material';
import config from '../../config.js';

export default function AlertCard({ file, onOpenMarkup }) {
    const storageKey = `status-${file.source}`;
    const getInitialChecked = () => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : false;
    };
    const [checked, setChecked] = useState(getInitialChecked);
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(checked));
    }, [checked, storageKey]);

    let cardTitle = undefined;
    if (file.source.length >= 30){
        cardTitle = file.source.slice(0, 27) + '...';
    }
    else{
        cardTitle = file.source;
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems:'center' }}>
            <Box sx={{ p: 0, minHeight: 180, maxWidth: 200, bgcolor: 'background.paper', borderTopLeftRadius: 4, borderTopRightRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={file.markupedUrl}
                    alt={file.source}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, pb: 1, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600} textAlign={'center'} gutterBottom noWrap>{cardTitle}</Typography>
                <Grid container spacing={1} sx={{ maxWidth: 200, justifyContent: { xs: 'space-evenly', lexWrap: 'wrap'  } }}>
                {[...(new Set(file.alerts))].map((alert, idx) => {
                    const count = file.alerts.reduce((acc, value) => (value === alert ? acc + 1 : acc), 0);
                    return (
                        <Grid item xs={4} key={idx} display={'flex'}>
                            <Chip
                                label={`${alert} ${count}`}
                                color="warning"
                                variant="filled"
                                size="small"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    );
                })}
                </Grid>
            </CardContent>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <Button size="small" variant="contained" sx={{ borderRadius: 4, width: '100%' }} onClick={() => { onOpenMarkup(); setChecked(true); }}>
                    Открыть разметку
                </Button>
                <Chip label={checked ? 'просмотрено' : 'не просмотрено'} color={checked ? 'success' : 'warning'} variant="filled" sx={{ borderRadius: 4, ml: 1 }} />
            </CardActions>
             <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <a href={`${config.backendUrl}/data/download/${file.source}`} download>
                <Button
                    size="small"
                    sx={{ borderRadius: 4, width: '100%' }}
                >
                        Скачать разметку
                </Button>
                </a>
            </CardActions>
        </Card>
    );
}
