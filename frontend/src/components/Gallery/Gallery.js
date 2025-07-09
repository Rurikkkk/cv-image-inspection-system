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
    const [loaded, setLoaded] = useState(false);

    // Загрузка списка изображений
    useEffect(() => {
        fetch(`${config.backendUrl}/api/images/images`)
            .then(r => r.ok ? r.json() : [])
            .then(setData)
            .catch(() => setData([]));
    }, []);

    // Загрузка нового файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
        setSelectedFile(file || null);
    };

    const handleUpload = async (e) => {
    setLoaded(true);
    e.preventDefault();
    if (!selectedFile) {
        setUploadError('Файл не выбран');
        setLoaded(false);
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
            // Обрабатываем JSON только если сервер его вернул
            let errorMessage = 'Ошибка загрузки';

            // Проверяем статус ответа
            if (response.status === 400) {
                const errData = await response.json();
                errorMessage = errData.error === 'File is already exists' ? `Файл с именем ${selectedFile.name} уже существует` : 'Некорректный запрос' ;
            } else {
                const errData = await response.json();
                errorMessage = errData.error || errorMessage;
            }

            setUploadError(errorMessage);
            setLoaded(false);
            return; // Не выбрасываем ошибку, просто завершаем функцию
        }

        const result = await response.json();
        setUploadError('');
        setData(prev => [...prev, result]);

    } catch (error) {
        console.error("Network error:", error);
        setUploadError('Сервер недоступен или произошла сетевая ошибка');
    }

    // Сброс полей
    if (fileRef.current) fileRef.current.value = '';
    setFileName('');
    setSelectedFile(null);
    setLoaded(false);
    };

    // Удаление изображения
    const handleDeleteImage = async (filename) => {
        try {
            const response = await fetch(`${config.backendUrl}/api/images/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ filename })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Ошибка при удалении:", errorData.error);
                return;
            }

            // Локальное удаление изображения из интерфейса
            setData(prev => prev.filter(img => img.source !== filename));
            

        } catch (error) {
            console.error("Ошибка сети при удалении:", error);
        }
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
                    loaded={loaded}
                />
            </form>
            <Grid container spacing={3} alignItems="stretch">
                {data.map((file) => (
                    <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
                        <GalleryCard
                            file={{
                                ...file,
                                srcUrl: `${config.backendUrl}/data/src_images/${file.source}`
                            }}
                            onOpenMarkup={() => window.open(`${config.backendUrl}/data/markuped_images/${file.markuped}`, '_blank')}
                            onDelete={() => handleDeleteImage(file.source)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}