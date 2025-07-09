# Базовый образ Node.js
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

RUN chmod -R 755 /app

# Запуск dev сервера
CMD ["npm", "start"]