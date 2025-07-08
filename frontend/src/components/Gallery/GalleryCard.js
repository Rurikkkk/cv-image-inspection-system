import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import config from '../../config';

function DeleteImageButton({ filename, onDelete}) {
    const storageKey = `status-${filename}`;
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить это изображение?")) {
            return;
        }

        try {
            onDelete();
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error("Ошибка удаления:", error);
        }
    };

    return (
        <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ borderRadius: 4, width: '100%' }}
            onClick={handleDelete}
        >
            Удалить
        </Button>
    );
}

export default function GalleryCard({ file, onOpenMarkup, onDelete }) {
    let cardTitle = undefined;
    if (file.source.length >= 30){
        cardTitle = file.source.slice(0, 27) + '...';
    }
    else{
        cardTitle = file.source;
    }
    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ p: 0, minHeight: 180, maxWidth: 200, bgcolor: 'background.paper', borderTopLeftRadius: 4, borderTopRightRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={file.srcUrl}
                    alt={file.source}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>{cardTitle}</Typography>
            </CardContent>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ borderRadius: 4, width: '100%' }}
                    onClick={onOpenMarkup}
                >
                    Открыть разметку
                </Button>
            </CardActions>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <DeleteImageButton filename={file.source} onDelete={onDelete} />
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