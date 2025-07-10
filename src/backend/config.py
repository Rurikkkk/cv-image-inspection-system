import os

class Config:
    # Пути к папкам и файлам
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DATA_DIR = os.path.join(BASE_DIR, "data")
    SRC_IMAGES_DIR = os.path.join(DATA_DIR, "src_images")
    MARKUPED_IMAGES_DIR = os.path.join(DATA_DIR, "markuped_images")
    IMAGES_JSON = os.path.join(DATA_DIR, "images.json")
    # URLS (используйте имена сервисов из docker-compose для работы внутри Docker)
    MANAGEMENT_SERVICE_URL = "http://image_management_service"
    MANAGEMENT_SERVICE_URL_PORT = "5000"
    MANAGEMENT_SERVICE_URL_PREFIX = "/api/images"
    MARKUP_SERVICE_URL = "http://image_markup_service"
    MARKUP_SERVICE_URL_PORT = "5000"
    MARKUP_SERVICE_URL_PREFIX = "/api/markup"
    # Параметры модели YOLO
    YOLO_MODEL_PATH = os.path.join(BASE_DIR, "yolo_model", "yolo.pt")

config = Config()
