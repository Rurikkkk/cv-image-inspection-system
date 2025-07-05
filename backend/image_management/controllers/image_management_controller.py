from image_management.models.file_system import FileSystem
import requests
import json
from config import config


class ImageManagementController:
    """
    Контроллер для загрузки и получения изображений.
    """

    @staticmethod
    def handle_upload(source_image):
        """
        Сохраняет исходное изображение, отправляет его на разметку,
        сохраняет размеченное изображение и обновляет json.
        """
        source_filename = source_image.filename
        FileSystem.save_source_image(source_image, source_filename)
        response = requests.post(
            config.MARKUP_SERVICE_URL,
            json={"filename": source_filename},
        )
        if response.status_code != 200:
            raise Exception(f"Ошибка сервиса разметки: {response.text}")
        markuped_image = response.content
        alerts = response.headers.get("Alerts")
        if alerts:
            alerts = json.loads(alerts)
        else:
            alerts = []
        markuped_filename = f"markuped_{source_filename}"
        FileSystem.save_markuped_image(markuped_image, markuped_filename)
        FileSystem.update_images_json(
            {
                "source": source_filename,
                "markuped": markuped_filename,
                "alerts": alerts,
            }
        )
        return {
            "source": source_filename,
            "markuped": markuped_filename,
            "alerts": alerts,
        }

    @staticmethod
    def get_images_data():
        """
        Возвращает список всех изображений из json.
        """
        return FileSystem.get_images_json()
