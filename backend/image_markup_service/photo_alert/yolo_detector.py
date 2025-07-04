from ultralytics import YOLO
import cv2
import numpy as np
import io

MODEL_PATH = "yolo_model/yolo11x.pt"
model = YOLO(MODEL_PATH)


def detect_and_annotate(img_bytes):
    """
    Принимает байты изображения,
    возвращает размеченное изображение (BytesIO) и список алертов.
    """
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = model(img)
    result = results[0]

    # Список алертов: [{"name": class_name, "rect": [x1, y1, x2, y2]}]
    alerts = []
    for box in result.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        class_id = int(box.cls[0])
        class_name = model.names[class_id]
        alerts.append({"name": class_name, "rect": [x1, y1, x2, y2]})

    # Рисуем разметку
    annotated_img = result.plot()
    is_success, buffer = cv2.imencode(".png", annotated_img)
    img_bytes_io = io.BytesIO(buffer.tobytes())
    img_bytes_io.seek(0)
    return img_bytes_io, alerts
