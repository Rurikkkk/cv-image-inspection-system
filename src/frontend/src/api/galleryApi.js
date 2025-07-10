// frontend/src/api/galleryApi.js
// API-слой для работы с галереей изображений
import config from '../config';

export async function fetchImages() {
    const res = await fetch(`${config.backendUrl}/api/images/images`);
    if (!res.ok) throw new Error('Ошибка загрузки списка изображений');
    return res.json();
}

export async function fetchAlertsImages() {
    // Получить только изображения с алертами
    const all = await fetchImages();
    return all.filter(img => Array.isArray(img.alerts) && img.alerts.length > 0 && img.alerts[0]);
}

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${config.backendUrl}/api/images/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) {
        let errMsg = 'Ошибка загрузки';
        try {
            const errData = await res.json();
            errMsg = errData.error || errMsg;
        } catch { }
        throw new Error(errMsg);
    }
    return res.json();
}

export async function deleteImage(filename) {
    const res = await fetch(`${config.backendUrl}/api/images/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
    });
    if (!res.ok) {
        let errMsg = 'Ошибка удаления';
        try {
            const errData = await res.json();
            errMsg = errData.error || errMsg;
        } catch { }
        throw new Error(errMsg);
    }
    return true;
}
