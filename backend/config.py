import os


class Config:
    # Пути к папкам и файлам
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DATA_DIR = os.path.join(BASE_DIR, "data")
    SRC_IMAGES_DIR = os.path.join(DATA_DIR, "src_images")
    MARKUPED_IMAGES_DIR = os.path.join(DATA_DIR, "markuped_images")
    IMAGES_JSON = os.path.join(DATA_DIR, "images.json")
    # URL'ы
    IMAGE_MANAGEMENT_URL_PREFIX = "/api/images"
    IMAGE_MARKUP_URL_PREFIX = "/api/markup"
    MARKUP_SERVICE_URL = "http://localhost:5001/api/markup/process"
    # Прочие параметры
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


config = Config()
