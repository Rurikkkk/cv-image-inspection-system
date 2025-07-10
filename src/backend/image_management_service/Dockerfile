# syntax=docker/dockerfile:1

FROM python:3.11-slim

WORKDIR /app

COPY image_management_service/. ./
COPY config.py ./config.py

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
