from flask import Flask, send_from_directory
from flask_cors import CORS
from config import config
from image_management.routes.image_management_routes import image_management_bp
from image_markup.routes.markup_routes import markup_bp
import os

app = Flask(__name__)
CORS(app)
app.config.from_object(config)

app.register_blueprint(
    image_management_bp, url_prefix=config.IMAGE_MANAGEMENT_URL_PREFIX
)
app.register_blueprint(markup_bp, url_prefix=config.IMAGE_MARKUP_URL_PREFIX)


@app.route("/data/download/<path:filename>")
def download_data(filename):
    """
    Скачивает файл
    """
    return send_from_directory(config.MARKUPED_IMAGES_DIR, 'markuped_'+filename, as_attachment=True)

@app.route("/data/<path:filename>")
def serve_data(filename):
    """
    Отдаёт файл из папки data (src_images или markuped_images).
    """
    return send_from_directory(config.DATA_DIR, filename)


if __name__ == "__main__":
    os.makedirs(config.SRC_IMAGES_DIR, exist_ok=True)
    os.makedirs(config.MARKUPED_IMAGES_DIR, exist_ok=True)
    app.run(host="0.0.0.0", port=5001, debug=False)
