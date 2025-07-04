# Image Markup Service

## Overview
This service receives an image, detects objects using YOLO, returns the marked-up image and a list of alerts (object classes and bounding boxes). Designed for use in a microservice architecture for computer vision.

## Microservice Structure
- `app.py` — Entry point, Flask app and endpoint.
- `photo_alert/yolo_detector.py` — YOLO detection and annotation logic.
- `yolo_model/yolo11x.pt` — YOLO model weights.
- `saved_images/` — Marked-up images.
- `tests/` — Test scripts and images.

## Dependencies
See `requirements.txt`.

## Running the Service
```sh
pip install -r requirements.txt
python app.py
```
Service will be available at `http://0.0.0.0:8081/`.

## API Endpoint

### POST /process
- **Request:** multipart/form-data, field `file` (image)
- **Response:** JPG file with markup, header `X-Alerts` with JSON list of alerts:
    ```json
    [
      {"name": "person", "rect": [x1, y1, x2, y2]},
      ...
    ]
    ```

## Data Storage
- Marked-up images: `saved_images/`

## Testing
See `tests/README.md`.
