import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

export default function UploadPhoto({ onUpload, error, fileRef, fileName, setFileName, onFileChange }) {
    const showFileName = Boolean(fileName) && fileName !== '0' && fileName !== 0;
    const showError = Boolean(error) && error !== 0 && error !== '0';
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <input
                type="file"
                accept="image/*"
                name="file"
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
            />
            <Button
                variant="contained"
                startIcon={<UploadIcon />}
                sx={{ borderRadius: 4 }}
                onClick={() => fileRef.current && fileRef.current.click()}
            >
                Выбрать фото
            </Button>
            {showFileName && typeof fileName === 'string' && fileName.trim() !== '' && (
                <Typography variant="body2" color="text.secondary">
                    {fileName}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 4 }}
                type="submit"
                disabled={!showFileName}
            >
                Загрузить
            </Button>
            {showError && <Typography color="error">{error}</Typography>}
        </Stack>
    );
}
