import { useState, useCallback } from 'react';
import * as galleryApi from '../api/galleryApi';

export default function useGallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const loadImages = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await galleryApi.fetchImages();
            setImages(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (file) => {
        setUploading(true);
        setUploadError('');
        try {
            const img = await galleryApi.uploadImage(file);
            setImages(prev => [...prev, img]);
            return img;
        } catch (e) {
            setUploadError(e.message);
            throw e;
        } finally {
            setUploading(false);
        }
    }, []);

    const deleteImage = useCallback(async (filename) => {
        try {
            await galleryApi.deleteImage(filename);
            setImages(prev => prev.filter(img => img.source !== filename));
            // Сбросить статус просмотра в localStorage
            const storageKey = `status-${filename}`;
            localStorage.removeItem(storageKey);
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, []);

    return {
        images,
        loading,
        error,
        loadImages,
        uploadImage,
        uploading,
        uploadError,
        deleteImage,
    };
}
