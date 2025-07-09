# Developer Notes: CV Image Inspection System

## Что нужно заполнить и проверить

### 1. Контакты и владельцы
- [ ] Заполнить свой GitHub username в [CODEOWNERS](./CODEOWNERS)
- [ ] Указать актуальный email и контакты в [README.md](./README.md), [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md)

### 2. Документация
- [ ] Описать API (OpenAPI/Swagger) в [backend/README.md](./backend/README.md)
- [ ] Добавить примеры запросов к API
- [ ] Добавить разделы "FAQ" и "Known Issues" в [README.md](./README.md)

### 3. Тесты и CI/CD
- [ ] Добавить тесты для backend (pytest, unittest)
- [ ] Добавить тесты для frontend (Jest, React Testing Library)
- [ ] Настроить CI/CD (например, GitHub Actions)

### 4. Безопасность
- [ ] Провести аудит безопасности зависимостей (npm audit, pip-audit)
- [ ] Проверить .env и .gitignore на отсутствие приватных данных в git

### 5. Качество кода
- [ ] Проверить и доработать code style ([frontend/.eslintrc.json](./frontend/.eslintrc.json), [backend/.flake8](./backend/.flake8))
- [ ] Проверить структуру компонентов frontend (разделение по папкам, переиспользуемость)
- [ ] Проверить бизнес-логику backend (разделение на модули, тестируемость)

### 6. UX/UI
- [ ] Проверить обработку ошибок и UX (валидация, сообщения, загрузка)
- [ ] Проверить адаптивность и кроссбраузерность

### 7. Docker и окружение
- [ ] Проверить Dockerfile и docker-compose.yml на актуальность
- [ ] Добавить .env.example для переменных окружения

---

## Рекомендации
- Используйте feature-ветки для новых фич
- Пишите осмысленные коммиты и описания PR
- Следите за актуальностью документации
- Не храните чувствительные данные в git
- Используйте code review

---

## TODO (дополнительно)
- [ ] Добавить автоматическую генерацию документации (например, Swagger, Storybook)
- [ ] Добавить pre-commit хуки (lint, тесты)
- [ ] Добавить badge'и (build, coverage, license)
- [ ] Добавить примеры интеграции с внешними сервисами
