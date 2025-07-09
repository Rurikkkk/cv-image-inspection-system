import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid, Chip } from '@mui/material';

/**
 * Универсальная карточка для изображений и алертов.
 * @param {object} props
 * @param {object} props.file - объект файла
 * @param {function} [props.onOpen] - обработчик предпросмотра (открыть фото)
 * @param {function} [props.onDelete] - обработчик удаления (опционально)
 * @param {boolean} [props.showAlerts] - показывать ли алерты
 * @param {boolean} [props.showDelete] - показывать ли кнопку удаления
 * @param {boolean} [props.showViewed] - показывать ли статус просмотра
 * @param {boolean} [props.viewed] - статус просмотрено
 */
export default function UnifiedCard({ file, onOpen, onDelete, showAlerts = false, showDelete = false, showViewed = false, viewed = false }) {
    let cardTitle = file.source.length >= 30 ? file.source.slice(0, 27) + '...' : file.source;
    const imageUrl = file.markupedUrl || file.srcUrl;

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {showViewed && (
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                    <Chip label={viewed ? 'просмотрено' : 'не просмотрено'} color={viewed ? 'success' : 'warning'} variant="filled" size="small" />
                </Box>
            )}
            <img
                src={imageUrl}
                alt={file.source}
                style={{ width: '100%', height: 200, objectFit: 'cover', background: '#f5f5f5', display: 'block', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            />
            <CardContent sx={{ flexGrow: 1, pb: 1, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600} textAlign={'center'} gutterBottom noWrap>{cardTitle}</Typography>
                {showAlerts && file.alerts && (
                    <Grid container spacing={1} sx={{ maxWidth: 200, justifyContent: { xs: 'space-evenly', flexWrap: 'wrap' } }}>
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
                )}
            </CardContent>
            <CardActions sx={{ pt: 0, pb: 2, px: 2, justifyContent: 'center' }}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ borderRadius: 4, width: '100%' }}
                    onClick={onOpen}
                >
                    Открыть
                </Button>
                {showDelete && onDelete && (
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 4, width: '100%', ml: 1 }}
                        onClick={onDelete}
                    >
                        Удалить
                    </Button>
                )}
                {showAlerts && file.markupedUrl && (
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: 4, width: '100%', ml: 1 }}
                        component="a"
                        href={file.markupedUrl}
                        download={file.source}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Скачать
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

UnifiedCard.propTypes = {
    file: PropTypes.object.isRequired,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func,
    showAlerts: PropTypes.bool,
    showDelete: PropTypes.bool,
    showViewed: PropTypes.bool,
    viewed: PropTypes.bool,
};
