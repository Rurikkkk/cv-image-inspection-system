import requests
import os


def test_markup_service():
    url = "http://localhost:8081/process"
    img_path = "tests/test_images/test1.jpg"
    if not os.path.exists(img_path):
        print(f"Test image not found: {img_path}")
        return
    with open(img_path, "rb") as f:
        files = {"file": ("test1.jpg", f, "image/jpg")}
        resp = requests.post(url, files=files)
        print("Status:", resp.status_code)
        if resp.status_code == 200:
            with open("tests/test_images/result.jpg", "wb") as out:
                out.write(resp.content)
            print("Alerts:", resp.headers.get("X-Alerts"))
        else:
            print(resp.text)


if __name__ == "__main__":
    test_markup_service()
