from flask import Flask, request, jsonify
from photo_alert.processing import process_image_batch
import json
import os

app = Flask(__name__)

SAVE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "saved_images")
os.makedirs(SAVE_DIR, exist_ok=True)


@app.route("/process", methods=["POST"])
def process_images():
    """
    Получает JSON с описанием изображений и алертов, а также файлы изображений.
    Если для изображения есть алерты — размечает и сохраняет результат, иначе просто сохраняет исходник.
    Возвращает JSON с результатами (пути к сохранённым файлам и алерты).
    """
    data = request.form.get("data")
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        images_info = json.loads(data)
    except Exception:
        return jsonify({"error": "Invalid JSON"}), 400

    files = request.files
    results = []

    for idx, img_info in enumerate(images_info):
        source_name = img_info["source"]
        alerts = img_info.get("alerts", [])
        if source_name not in files:
            results.append({"error": f"File {source_name} not uploaded"})
            continue
        img_file = files[source_name]
        if alerts:
            # Разметка и сохранение
            processed = process_image_batch([img_info], {source_name: img_file})[0]
            out_path = os.path.join(SAVE_DIR, f"markuped_{source_name}")
            with open(out_path, "wb") as f:
                f.write(processed["image"].getvalue())
            results.append(
                {
                    "source": source_name,
                    "markuped": f"markuped_{source_name}",
                    "alerts": alerts,
                }
            )
        else:
            # Просто сохранить исходник
            out_path = os.path.join(SAVE_DIR, source_name)
            img_file.seek(0)
            with open(out_path, "wb") as f:
                f.write(img_file.read())
            results.append({"source": source_name, "markuped": None, "alerts": []})
    return jsonify(results), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
