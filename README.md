# CV Image Inspection System

![Логотип](frontend/public/logo.jpg)

---

## Описание

**CV Image Inspection System** — комплексная система для загрузки, разметки, автоматического анализа и управления изображениями с помощью современных методов компьютерного зрения (YOLO и др.).

- Веб-интерфейс ([frontend/](./frontend/README.md)) для загрузки, просмотра, фильтрации и разметки изображений
- Серверная часть ([backend/](./backend/README.md)) с REST API, интеграцией с ML и хранением
- Docker-окружение для быстрого старта ([docker-compose.yml](./docker-compose.yml))
- Модульная архитектура, расширяемость, чистый код

---

## Структура репозитория

```
cv-image-inspection-system/
├── backend/         # Серверная часть (FastAPI/Flask, обработка, API, ML)
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── image_management/
│   ├── image_markup/
│   └── yolo_model/
├── frontend/        # Веб-интерфейс (React, MUI)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
├── .editorconfig
├── CODEOWNERS
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── README.md
```

- [backend/README.md](./backend/README.md) — подробности по серверу
- [frontend/README.md](./frontend/README.md) — подробности по клиенту
- [CONTRIBUTING.md](./CONTRIBUTING.md) — как внести вклад
- [SECURITY.md](./SECURITY.md) — политика безопасности
- [CODEOWNERS](./CODEOWNERS) — владельцы кода

---

## Быстрый старт

### Через Docker Compose
```sh
git clone https://github.com/your-org/cv-image-inspection-system.git
cd cv-image-inspection-system
docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

### Локально (разработка)
#### Backend
```sh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

#### Frontend
```sh
cd frontend
npm install
npm start
```

---

## Основные возможности
- Загрузка и удаление изображений
- Просмотр галереи и предпросмотр фото
- Автоматическая разметка и алерты (YOLO)
- Скачивание размеченных изображений
- Отслеживание статуса просмотра
- Современный UI ([Material UI](https://mui.com/))

---

## Архитектура
- **Frontend:** React, Material UI, модульные компоненты, современный UX ([frontend/README.md](./frontend/README.md))
- **Backend:** Python (FastAPI/Flask), REST API, интеграция с ML ([backend/README.md](./backend/README.md))
- **ML:** YOLO, поддержка кастомных моделей ([backend/yolo_model/](./backend/yolo_model/))
- **Docker:** изолированное окружение, быстрый деплой ([docker-compose.yml](./docker-compose.yml))

---

## Как внести вклад
1. Форкните репозиторий
2. Создайте ветку feature/your-feature
3. Оформите PR с описанием изменений
4. Следуйте code style ([frontend/.eslintrc.json](./frontend/.eslintrc.json), [backend/.flake8](./backend/.flake8))

---

## Лицензия
[MIT License](./LICENSE)

---

## Контакты
- [issues](https://github.com/your-org/cv-image-inspection-system/issues)
- maintainer: your.email@example.com