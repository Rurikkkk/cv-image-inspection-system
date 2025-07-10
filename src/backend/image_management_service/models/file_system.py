import os
import json
from config import config

class FileSystem:
    """
    Утилиты для работы с файловой системой изображений и json-метаданными.
    """

    @staticmethod
    def save_source_image(source_file, filename: str) -> str:
        """
        Сохраняет исходное изображение в папку src_images.
        """
        os.makedirs(config.SRC_IMAGES_DIR, exist_ok=True)
        file_path = os.path.join(config.SRC_IMAGES_DIR, filename)
        source_file.save(file_path)
        return file_path

    @staticmethod
    def save_markuped_image(content: bytes, filename: str) -> str:
        """
        Сохраняет размеченное изображение в папку markuped_images.
        """
        os.makedirs(config.MARKUPED_IMAGES_DIR, exist_ok=True)
        file_path = os.path.join(config.MARKUPED_IMAGES_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(content)
        return file_path

    @staticmethod
    def update_images_json(record: dict):
        """
        Добавляет запись об изображении в общий JSON.
        """
        data = FileSystem.get_images_json()
        if any(note['source'] == record['source'] for note in data):
            raise Exception('File is already exists')
        data.append(record)
        with open(config.IMAGES_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    @staticmethod
    def delete_note(filename: str):
        DELETE_SRC_filepath = os.path.join(config.SRC_IMAGES_DIR, filename)
        markuped_filename = 'markuped_'+filename
        DELETE_MARKUP_filepath = os.path.join(config.MARKUPED_IMAGES_DIR, markuped_filename)
        os.remove(DELETE_SRC_filepath)
        os.remove(DELETE_MARKUP_filepath)
        data = FileSystem.get_images_json()
        for note in data:
            if note["source"] == filename:
                data.remove(note)
                break
        with open(config.IMAGES_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    @staticmethod
    def get_images_json() -> list[dict]:
        """
        Возвращает общий JSON изображений.
        """
        if not os.path.exists(config.IMAGES_JSON):
            return []
        with open(config.IMAGES_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
