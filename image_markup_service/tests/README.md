# Тесты для Image Markup Service

## Содержание
- `test_data_1.json`, `test_data_2.json`, `test_data_no_alerts.json` — примеры входных данных
- `generate_test_images.py` — генерация тестовых изображений
- `test_images/` — папка для тестовых изображений
- `test_service.py` — скрипт для проверки работы сервиса

## Как использовать
1. Сгенерируйте тестовые изображения:
```sh
python generate_test_images.py
```
2. Запустите сервис разметки (`python ../app.py`)
3. Проверьте работу сервиса:
```sh
python test_service.py
```

Результаты будут выведены в консоль.
