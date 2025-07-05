import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, Stack, Chip } from '@mui/material';

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

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ p: 0, minHeight: 180, bgcolor: 'background.paper', borderTopLeftRadius: 4, borderTopRightRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={file.markupedUrl}
                    alt={file.source}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>{file.source}</Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
                    {file.alerts.map((alert, idx) => (
                        <Chip key={idx} label={alert} color="warning" variant="filled" size="small" />
                    ))}
                </Stack>
            </CardContent>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <Button size="small" variant="contained" sx={{ borderRadius: 4, width: '100%' }} onClick={() => { onOpenMarkup(); setChecked(true); }}>
                    Открыть
                </Button>
                <Chip label={checked ? 'просмотрено' : 'не просмотрено'} color={checked ? 'success' : 'warning'} variant="filled" sx={{ borderRadius: 4, ml: 1 }} />
            </CardActions>
        </Card>
    );
}
