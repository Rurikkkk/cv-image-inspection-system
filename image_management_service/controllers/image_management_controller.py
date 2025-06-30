from models.file_system import FileSystem
import requests
import json

MARKUP_SERVICE_URL = 'MARKUP_SERVICE_URL'

class ImageManagementController:
    @staticmethod
    def handle_upload(source_image):
        """Обрабатывает загрузку изображения, отправляет на разметку, сохраняет результат и обновляет JSON."""
        source_filename = source_image.filename
        FileSystem.save_source_image(source_image, source_filename)
        response = requests.post(
            MARKUP_SERVICE_URL,
            json={'filename': source_filename}
        )
        if response.status_code != 200:
            raise Exception('Ошибка сервиса разметки')
        markuped_image = response.content  # ожидаем, что файл возвращается как bytes
        alerts = response.headers.get('Alerts')
        if alerts:
            alerts = json.loads(alerts)
        else:
            alerts = []
        markuped_filename = source_filename
        FileSystem.save_markuped_image(markuped_image, markuped_filename)
        FileSystem.update_images_json({
            'source': source_filename,
            'markuped': markuped_filename,
            'alerts': alerts
        })
        return {
            'source': source_filename,
            'markuped': markuped_filename,
            'alerts': alerts
        }

    @staticmethod
    def get_images_data():
        return FileSystem.get_images_json()
