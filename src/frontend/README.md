# Frontend Service

Микросервис реализует пользовательский интерфейс для загрузки изображений и просмотра результатов разметки. Построен на React + MUI и взаимодействует с backend-сервисом управления изображениями.

## Основные возможности
- Загрузка изображений в систему
- Просмотр галереи исходных и размеченных изображений
- Просмотр списка объектов для каждого изображения

## Запуск локально

1. Перейдите в директорию фронтенда:
   ```sh
   cd src/frontend
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```
3. Запустите приложение:
   ```sh
   npm start
   ```

## Настройки
- Основные параметры API задаются в файле `src/config.js`.

## Зависимости
- React
- Material UI
- Bootstrap
- @emotion/react, @emotion/styled

## Примечания
- Для работы требуется запущенный backend (image_management_service и image_markup_service).
