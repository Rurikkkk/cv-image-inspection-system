from flask import Blueprint, request, send_file, jsonify
from photo_alert.yolo_detector import detect_and_annotate
import os
import json
from config import config

markup_bp = Blueprint("image_markup", __name__)

@markup_bp.route("/process", methods=["POST"])
def process_image():
    """
    Обрабатывает изображение по имени файла,
    возвращает размеченное изображение и алерты.
    """
    data = request.get_json()
    if not data or "filename" not in data:
        return jsonify({"error": "No filename provided"}), 400
    filename = data["filename"]
    src_path = os.path.join(config.SRC_IMAGES_DIR, filename)
    if not os.path.exists(src_path):
        return jsonify({"error": "File not found"}), 404
    with open(src_path, "rb") as f:
        img_bytes = f.read()
    annotated_img, alerts = detect_and_annotate(img_bytes)
    markuped_filename = f"markuped_{filename}"
    markup_path = os.path.join(config.MARKUPED_IMAGES_DIR, markuped_filename)
    with open(markup_path, "wb") as f:
        f.write(annotated_img.getvalue())
    response = send_file(
        annotated_img,
        mimetype="image/png",
        as_attachment=True,
        download_name=markuped_filename,
    )
    response.headers["Alerts"] = json.dumps(alerts, ensure_ascii=False)
    return response
