from flask import Blueprint, request, jsonify
from controllers.image_management_controller import ImageManagementController

image_management_routes = Blueprint('image_management_routes', __name__)

@image_management_routes.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No uploaded file'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No filename provided'}), 400
    try:
        result = ImageManagementController.handle_upload(file)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@image_management_routes.route('/images', methods=['GET'])
def get_images():
    images = ImageManagementController.get_images_data()
    return jsonify(images), 200
