# CV Image Inspection System

Многоуровневая система для загрузки, разметки и анализа изображений с современным веб-интерфейсом и микросервисным backend.

---

## Структура репозитория

- `frontend/` — одностраничное приложение (SPA) на React + MUI (Material You)
- `backend/` — Python Flask backend для управления изображениями и разметкой

---

## Быстрый старт


### Режим разработки

Для запуска приложения в режиме разработки на Unix-системах:
1) Склонируйте репозиторий
    ```sh
    git clone https://github.com/Rurikkkk/cv-image-inspection-system
    ```
2) Перейдите в директорию
    ```sh
    cd cv-image-inspection-system
    ```
3) Перейдите в ветку docker-setup
    ```sh
    git checkout docker-setup
    ```
4) Выполните скрипт launch.sh
    ```sh
    chmod +x launch.sh
    ./launch.sh
    ```
5) По завершении выполните команды
    ```sh
    lsof -i :5001 // найдите PID процесса с именем Python
    lsof -i :3000 // найдит PID процесса с именем node
    kill <python_PID>
    kill <node_PID>
    ```

Режим разработчика позволяет вносить изменения в коде и сразу видеть результат

### Запуск проекта

1) Склонируйте репозиторий
    ```sh
    git clone https://github.com/Rurikkkk/cv-image-inspection-system
    ```
2) Перейдите в директорию
    ```sh
    cd cv-image-inspection-system
    ```
3) Перейдите в ветку docker-setup
    ```sh
    git checkout docker-setup
    ```
4) Выполните сборку (*Внимание:* требуется установленный Docker (https://www.docker.com/))
    ```sh
    docker-compose up --build
    ```

## Основные возможности

- Загрузка изображений через современный UI
- Просмотр галереи и разметка фото
- Система предупреждений (алертов) с отметкой просмотренных
- Полная адаптивность и поддержка Material You
- Централизованная темизация, быстрый переключатель темы

---

## Документация
- Подробности по frontend: см. `frontend/README.md`
- Подробности по backend: см. `backend/README.md`

