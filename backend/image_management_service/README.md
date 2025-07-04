# Image Management Service

## Overview
This service is responsible for uploading images and sending them to the markup service for further processing, as well as storing images with alerts and providing information about them. The service is intended for use as part of a microservice architecture for computer vision tasks and issuing alerts about prohibited objects.

## Microservice Structure
- `app.py` — Entry point, initializes the Flask application and registers routes.
- `routes/image_management_routes.py` — HTTP endpoints for uploading images and retrieving information about them.
- `controllers/image_management_controller.py` — Business logic for handling uploads and data aggregation.
- `models/file_system.py` — File operations and JSON storage.
- `../data/` — Stores uploaded and marked-up images, as well as information about them (JSON).

## Dependencies
The microservice dependencies are listed in `requirements.txt`.

## Running the Service
```sh
python app.py
```
The service will be available at `http://0.0.0.0:5001/`.

## API Endpoints

### 1. Upload Image
- **URL:** `/upload`
- **Method:** `POST`
- **Request:**
  - Content-Type: `multipart/form-data`
  - Form field: `file` (the image to upload)
- **Response:**
  - `200 OK` with JSON:
    ```json
    {
      "source": "source_filename",
      "markuped": "markuped_filename",
      "alerts": ["alert1", "alert2", ...]
    }
    ```
  - `400` or `500` with an error message if the upload fails.

### 2. Get All Images Information
- **URL:** `/images`
- **Method:** `GET`
- **Response:**
  - `200 OK` with a JSON array:
    ```json
    [
      {
        "source": "source_filename",
        "markuped": "markuped_filename",
        "alerts": ["alert1", "alert2", ...]
      },
      ...
    ]
    ```

## Data Storage
- Uploaded images: `../data/src_images/`
- Marked-up images: `../data/markuped_images/`
- Image information: `../data/images.json`

## Notes
- The URL of the markup service (`MARKUP_SERVICE_URL`) and the path to the data folder will be loaded from a configuration file in the future.

---

# Сервис Управления Изображениями

## Общее описание
Данный сервис отвечает за загрузку изображений и их передачу сервису разметки для дальнейшей обработки, а также хранение изображений с предупреждениями каждого из них и предоставление информации о них. Сервис предназначен для использования в составе микросервисной архитектуры проекта для задач компьютерного зрения и выдачи предупреждений о запрещённых объектах.

## Структура микросервиса
- `app.py` — Точка входа, инициализация Flask-приложения и регистрация маршрутов.
- `routes/image_management_routes.py` — HTTP-эндпоинты для загрузки изображений и получения информации о них.
- `controllers/image_management_controller.py` — Бизнес-логика обработки загрузок и агрегации данных.
- `models/file_system.py` — Операции с файлами и хранение JSON.
- `../data/` — Хранение загруженных и размеченных изображений, а также информации о них (JSON).

## Зависимости
Зависимости микросервиса представлены в `requirements.txt`.

## Запуск сервиса
```sh
python app.py
```
Сервис будет доступен по адресу `http://0.0.0.0:5001/`.

## API эндпоинты

### 1. Загрузка изображения
- **URL:** `/upload`
- **Метод:** `POST`
- **Запрос:**
  - Content-Type: `multipart/form-data`
  - Поле формы: `file` (загружаемое изображение)
- **Ответ:**
  - `200 OK` с JSON:
    ```json
    {
      "source": "source_filename",
      "markuped": "markuped_filename",
      "alerts": ["alert1", "alert2", ...]
    }
    ```
  - `400` или `500` с сообщением об ошибке при неудачной загрузке.

### 2. Получение информации по всем изображениям
- **URL:** `/images`
- **Метод:** `GET`
- **Ответ:**
  - `200 OK` с JSON-массивом:
    ```json
    [
      {
        "source": "source_filename",
        "markuped": "markuped_filename",
        "alerts": ["alert1", "alert2", ...]
      },
      ...
    ]
    ```

## Хранение данных
- Загруженные изображения: `../data/src_images/`
- Размеченные изображения: `../data/markuped_images/`
- Информация об изображениях: `../data/images.json`

## Примечания
- URL сервиса разметки (`MARKUP_SERVICE_URL`) и путь к папке data в будущем будет загружаться из конфигурационного файла.