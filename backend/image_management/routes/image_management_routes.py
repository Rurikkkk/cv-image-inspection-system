from flask import Blueprint, request, jsonify
from image_management.controllers.image_management_controller import (
    ImageManagementController,
)

image_management_bp = Blueprint("image_management", __name__)


@image_management_bp.route("/upload", methods=["POST"])
def upload_image():
    """
    Загружает изображение на сервер и инициирует его обработку.
    """
    if "file" not in request.files:
        return jsonify({"error": "No uploaded file"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No filename provided"}), 400
    try:
        result = ImageManagementController.handle_upload(file)
        return jsonify(result), 200
    except Exception as e:
        if str(e) == 'File is already exists':
            return jsonify({"error": str(e)}), 400
        return jsonify({"error": str(e)}), 500
    
@image_management_bp.route("/delete", methods=["POST"])
def delete_image():
    """
    Удаляет изображение по имени, указанному в теле запроса.
    """
    data = request.get_json()
    if not data or "filename" not in data:
        return jsonify({"error": "Missing 'filename' in request body"}), 400

    filename = data["filename"]

    try:
        result = ImageManagementController.handle_delete(filename)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@image_management_bp.route("/images", methods=["GET"])
def get_images():
    """
    Возвращает список исходных и размеченных файлов (только имена).
    """
    images = ImageManagementController.get_images_data()
    for img in images:
        img["source"] = img["source"].split("/")[-1]
        img["markuped"] = img["markuped"].split("/")[-1]
    return jsonify(images), 200
