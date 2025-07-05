from ultralytics import YOLO
import cv2
import numpy as np
import io
import os
from config import config

MODEL_PATH = os.path.join(config.BASE_DIR, "yolo_model/yolo11x.pt")
model = YOLO(MODEL_PATH)


def detect_and_annotate(img_bytes):
    """
    Детектирует объекты на изображении и
    возвращает размеченное изображение и список алертов.
    :param img_bytes: байты исходного изображения
    :return: BytesIO размеченного изображения, список алертов
    """
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = model(img)
    result = results[0]
    alerts = []

    for box in result.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        class_id = int(box.cls[0])
        class_name = model.names[class_id]
        alerts.append(class_name)

    annotated_img = result.plot()
    is_success, buffer = cv2.imencode(".png", annotated_img)
    img_bytes_io = io.BytesIO(buffer.tobytes())
    img_bytes_io.seek(0)
    return img_bytes_io, alerts
