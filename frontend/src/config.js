// src/config.js
// Централизованный конфиг для API и путей

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const config = {
    backendUrl,
};

export default config;
