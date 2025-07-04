from flask import Flask, request, send_file, jsonify
from photo_alert.yolo_detector import detect_and_annotate
import os
import json

app = Flask(__name__)


@app.route("/process", methods=["POST"])
def process_image():
    """
    Получает изображение, прогоняет через YOLO,
    возвращает размеченное изображение и список алертов.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_bytes = file.read()
    img_name = file.filename

    annotated_img, alerts = detect_and_annotate(img_bytes)

    # Сохраняем размеченное изображение
    save_dir = os.path.join(os.path.dirname(__file__), "saved_images")
    os.makedirs(save_dir, exist_ok=True)
    markup_path = os.path.join(save_dir, f"markuped_{img_name}")
    with open(markup_path, "wb") as f:
        f.write(annotated_img.getvalue())

    # Возвращаем файл и json с алертами
    response = send_file(
        annotated_img,
        mimetype="image/png",
        as_attachment=True,
        download_name=f"markuped_{img_name}",
    )
    response.headers["X-Alerts"] = json.dumps(alerts, ensure_ascii=False)
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
