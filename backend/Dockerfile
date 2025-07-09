# Берём более "толстый" образ с доступом к системным пакетам
FROM python:3.12-bullseye

WORKDIR /app

# Установка системных зависимостей для OpenCV
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libgl1 \
        libsm6 \
        libxrender1 \
        libxext6 \
        ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Установка Python-зависимостей
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копируем исходники
COPY . .

RUN chmod -R 755 /app

# Запуск приложения
CMD ["python", "app.py"]