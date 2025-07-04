# Image Markup Service

## Overview
This service is responsible for marking up images based on received JSON with alerts and rectangle coordinates. If there are no alerts, the image is saved as is. The service saves both marked-up and original images and returns a JSON with the results. It is intended for use as part of a microservice architecture for computer vision tasks and issuing alerts about prohibited objects.

## Microservice Structure
- `app.py` — Entry point, initializes the Flask application and registers the main endpoint.
- `photo_alert/processing.py` — Image processing logic (drawing rectangles and labels).
- `photo_alert/schemas.py` — Constants and color schemes.
- `photo_alert/external_api.py` — Template for communication with external services.
- `tests/` — Test data, test scripts, and image generators.
- `saved_images/` — Stores processed and original images.

## Dependencies
The microservice dependencies are listed in `requirements.txt`.

## Running the Service
```sh
pip install -r requirements.txt
python app.py
```
The service will be available at `http://0.0.0.0:8080/`.

## API Endpoints

### 1. Process Images
- **URL:** `/process`
- **Method:** `POST`
- **Request:**
  - Content-Type: `multipart/form-data`
  - Form field: `data` (JSON array with image info and alerts)
  - Image files: each file must match the `source` field in JSON
- **Response:**
  - `200 OK` with JSON array:
    ```json
    [
      {
        "source": "source_filename",
        "markuped": "markuped_filename",
        "alerts": [
          {"name": "alert1", "rect": [10, 10, 100, 100]},
          ...
        ]
      },
      ...
    ]
    ```
  - `400` or `500` with an error message if the request fails.

## Data Storage
- Processed and original images: `saved_images/`
- Test images: `tests/test_images/`
- Test data: `tests/test_data_*.json`

## Notes
- The service expects the JSON and files to be sent in a single multipart/form-data request.
- The service can be tested using scripts in the `tests/` folder.
- The service is designed to be used together with the image management service in a microservice architecture.

---

# Сервис Разметки Изображений

## Общее описание
Данный сервис отвечает за разметку изображений по полученному JSON с алертами и координатами прямоугольников. Если алертов нет — изображение сохраняется без изменений. Сервис сохраняет размеченные и исходные изображения, возвращает JSON с результатами. Предназначен для использования в составе микросервисной архитектуры для задач компьютерного зрения и выдачи предупреждений о запрещённых объектах.

## Структура микросервиса
- `app.py` — Точка входа, инициализация Flask-приложения и регистрация основного эндпоинта.
- `photo_alert/processing.py` — Логика обработки изображений (рисование прямоугольников и подписей).
- `photo_alert/schemas.py` — Константы и цветовые схемы.
- `photo_alert/external_api.py` — Заготовка для общения с внешними сервисами.
- `tests/` — Тестовые данные, автотесты и генерация тестовых изображений.
- `saved_images/` — Хранение обработанных и исходных изображений.

## Зависимости
Зависимости микросервиса представлены в `requirements.txt`.

## Запуск сервиса
```sh
pip install -r requirements.txt
python app.py
```
Сервис будет доступен по адресу `http://0.0.0.0:8081/`.

## API эндпоинты

### 1. Обработка изображений
- **URL:** `/process`
- **Метод:** `POST`
- **Запрос:**
  - Content-Type: `multipart/form-data`
  - Поле формы: `data` (JSON-массив с информацией об изображениях и алертах)
  - Файлы изображений: каждый файл должен соответствовать полю `source` в JSON
- **Ответ:**
  - `200 OK` с JSON-массивом:
    ```json
    [
      {
        "source": "source_filename",
        "markuped": "markuped_filename",
        "alerts": [
          {"name": "alert1", "rect": [10, 10, 100, 100]},
          ...
        ]
      },
      ...
    ]
    ```
  - `400` или `500` с сообщением об ошибке при неудачном запросе.

## Хранение данных
- Обработанные и исходные изображения: `saved_images/`
- Тестовые изображения: `tests/test_images/`
- Тестовые данные: `tests/test_data/`

## Примечания
- Сервис ожидает, что JSON и файлы будут отправлены в одном multipart/form-data запросе.
- Сервис можно тестировать с помощью скриптов из папки `tests/`.
- Сервис предназначен для совместной работы с сервисом управления изображениями в рамках микросервисной архитектуры.
