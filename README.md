# CV Image Inspection System

Комплексная система для классификации и разметки объектов на изображениях с помощью компьютерного зрения (YOLO). Проект реализован на микросервисной архитектуре и включает три сервиса:

- **Frontend** — пользовательский веб-интерфейс на React для загрузки и просмотра изображений и списка объектов на них.
- **Image Management Service** — backend-сервис на Flask для хранения, учёта и маршрутизации изображений между фронтендом и сервисом разметки.
- **Image Markup Service** — backend-сервис на Flask для разметки изображений с помощью модели YOLO и формирования списка объектов.

## Основные возможности

- Загрузка и удаление изображений
- Просмотр галереи и отдельных изображений
- Автоматическая разметка (YOLO)
- Скачивание размеченных изображений
- Отслеживание статуса просмотра
- Современный UI ([Material UI](https://mui.com/))

## Структура репозитория

```
cv-image-inspection-system/
├── src/
│   ├── backend/
│   │   ├── data/                       # Директория изображений и метаданных
│   │   │   ├── src_images/
│   │   │   ├── markuped_images/
│   │   │   └── images.json
│   │   ├── image_management_service/   # Сервис управления изображениями (Flask)
│   │   │   └── ...
│   │   ├── image_markup_service/       # Сервис разметки изображений (Flask)
│   │   │   ├── yolo_model/             # Директория для файла модели YOLO
│   │   │   └── ...
│   │   └── config.py                   # Конфигурационный файл backend-микросервисов
│   └── frontend/                       # Фронтенд-сервис (React)
│       └── ...
├── .editorconfig
├── .gitignore
├── CONTRIBUTING.md
├── docker-compose.yaml
├── LICENSE
└── README.md
```

## Архитектура взаимодействия микросервисов

```
[User] ⇄ [Frontend (React)] ⇄ [Image Management Service (Flask)] ⇄ [Image Markup Service (Flask + YOLO)]
```

- Frontend взаимодействует только с сервисом управления изображениями.
- Сервис управления хранит изображения, JSON-метаданные и взаимодействует с сервисом разметки.
- Сервис разметки использует модель YOLO для выделения объектов и формирования списка объектов.

## Быстрый старт (Docker Compose)

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/Rurikkkk/cv-image-inspection-system
   ```
2. Перейдите в корневую папку проекта:
   ```sh
   cd cv-image-inspection-system
   ```
3. Поместите файл модели YOLO в папку `src/backend/image_markup_service/yolo_model/` и переименуйте его в `yolo.pt`.
4. Соберите и запустите все сервисы:
   ```sh
   docker-compose up --build
   ```
4. Фронтенд будет доступен на http://localhost:80

## Документация

- Подробности по [Frontend](./src/frontend/README.md)
- Подробности по [Image Management Service](./src/backend/image_management_service/README.md)
- Подробности по [Image Markup Service](./src/backend/image_markup_service/README.md)

## Контакты

Если у вас есть вопросы, предложения или вы хотите присоединиться к разработке:
- Открывайте Issue или Pull request на GitHub
- Обращайтесь к владельцам репозитория: [@Rurikkkk](https://github.com/Rurikkkk), [@Syricoff](https://github.com/Syricoff), [@Kr-EA](https://github.com/Kr-EA)

## Лицензия

Проект распространяется по лицензии [MIT](./LICENSE).