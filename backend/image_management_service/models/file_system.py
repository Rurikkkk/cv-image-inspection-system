import os
import json
from typing import List, Dict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
SRC_IMAGES_DIR = os.path.join(DATA_DIR, 'src_images')
MARKUPED_IMAGES_DIR = os.path.join(DATA_DIR, 'markuped_images')
IMAGES_JSON = os.path.join(DATA_DIR, 'images.json')

class FileSystem:
    @staticmethod
    def save_source_image(source_file, filename: str) -> str:
        """Сохраняет исходное изображение в папку src_images."""
        os.makedirs(SRC_IMAGES_DIR, exist_ok=True)
        file_path = os.path.join(SRC_IMAGES_DIR, filename)
        source_file.save(file_path)
        return file_path

    @staticmethod
    def save_markuped_image(content: bytes, filename: str) -> str:
        """Сохраняет размеченное изображение в папку markuped_images."""
        os.makedirs(MARKUPED_IMAGES_DIR, exist_ok=True)
        file_path = os.path.join(MARKUPED_IMAGES_DIR, filename)
        with open(file_path, 'wb') as f:
            f.write(content)
        return file_path

    @staticmethod
    def update_images_json(record: Dict):
        """Добавляет запись об изображении в общий JSON изображений."""
        if not os.path.exists(IMAGES_JSON):
            data = []
        else:
            with open(IMAGES_JSON, 'r', encoding='utf-8') as f:
                data = json.load(f)
        data.append(record)
        with open(IMAGES_JSON, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    @staticmethod
    def get_images_json() -> List[Dict]:
        """Возвращает общий JSON изображений."""
        if not os.path.exists(IMAGES_JSON):
            return []
        with open(IMAGES_JSON, 'r', encoding='utf-8') as f:
            return json.load(f)
