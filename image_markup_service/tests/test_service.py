import requests
import json
import os


def test_service(json_path, images_dir, url="http://localhost:8081/process"):
    """
    Тестирует сервис разметки: отправляет json и изображения, выводит результат.
    """
    with open(json_path, "r") as f:
        data = json.load(f)
    files = {}
    for entry in data:
        img_path = os.path.join(images_dir, entry["source"])
        files[entry["source"]] = open(img_path, "rb")
    resp = requests.post(url, data={"data": json.dumps(data)}, files=files)
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.text}")
    for f in files.values():
        f.close()


if __name__ == "__main__":
    # Пример запуска
    test_service("./tests/test_data/test_data_1.json", "./tests/test_images")
    test_service("./tests/test_data/test_data_2.json", "./tests/test_images")
    test_service("./tests/test_data/test_data_no_alerts.json", "./tests/test_images")
