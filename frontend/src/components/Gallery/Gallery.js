import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UploadPhoto from './UploadPhoto';
import GalleryCard from './GalleryCard';
import config from '../../config';

export default function Gallery() {
    const [data, setData] = useState([]);
    const [uploadError, setUploadError] = useState('');
    const fileRef = useRef();
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetch(`${config.backendUrl}/api/images/images`)
            .then(r => r.ok ? r.json() : [])
            .then(setData)
            .catch(() => setData([]));
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
        setSelectedFile(file || null);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadError('Файл не выбран');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(`${config.backendUrl}/api/images/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                let err = await response.json();
                setUploadError(err.error || 'Ошибка загрузки');
                throw new Error('Ошибка загрузки');
            } else {
                setUploadError('');
                fetch(`${config.backendUrl}/api/images/images`).then(r => r.json()).then(setData);
            }
        } catch {
            setUploadError('Сервер недоступен');
        }
        if (fileRef.current) fileRef.current.value = '';
        setFileName('');
        setSelectedFile(null);
    };

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>Галерея фото</Typography>
            <form onSubmit={handleUpload} style={{ marginBottom: 24 }}>
                <UploadPhoto
                    onUpload={handleUpload}
                    error={uploadError}
                    fileRef={fileRef}
                    fileName={fileName}
                    setFileName={setFileName}
                    onFileChange={handleFileChange}
                />
            </form>
            <Grid container spacing={3} alignItems="stretch">
                {data.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
                        <GalleryCard file={{ ...file, srcUrl: `${config.backendUrl}/data/src_images/${file.source}` }} onOpenMarkup={() => window.open(`${config.backendUrl}/data/markuped_images/${file.markuped}`, '_blank')} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
