import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import UploadPhoto from './UploadPhoto';
import GalleryCard from './GalleryCard';
import config from '../../config';
import useGallery from '../../hooks/useGallery';

export default function Gallery() {
    const fileRef = useRef();
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const {
        images,
        loading,
        error,
        loadImages,
        uploadImage,
        uploadError,
        deleteImage,
        uploading, // добавлено
    } = useGallery();

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
        setSelectedFile(file || null);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        try {
            await uploadImage(selectedFile);
            if (fileRef.current) fileRef.current.value = '';
            setFileName('');
            setSelectedFile(null);
        } catch { }
    };

    const handleDeleteImage = async (filename) => {
        try {
            await deleteImage(filename);
        } catch { }
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
                    uploading={uploading} // передаём проп
                />
            </form>
            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={3} alignItems="stretch">
                {images.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
                        <GalleryCard
                            file={{ ...file, srcUrl: `${config.backendUrl}/data/src_images/${file.source}` }}
                            onDelete={() => handleDeleteImage(file.source)}
                            showDelete={true}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}