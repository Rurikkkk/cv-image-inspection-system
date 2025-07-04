# Заготовка для общения с другими сервисами
import requests


def notify_other_service(payload, url):
    """
    Отправляет POST-запрос с payload на указанный url другого сервиса.
    Возвращает ответ как dict или ошибку.
    """
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {"error": str(e)}
