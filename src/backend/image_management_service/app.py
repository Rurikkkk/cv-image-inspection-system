from flask import Flask
from flask_cors import CORS
from config import config
from routes.image_management_routes import image_management_bp
import os

app = Flask(__name__)
CORS(app)
app.config.from_object(config)

app.register_blueprint(image_management_bp, url_prefix=config.MANAGEMENT_SERVICE_URL_PREFIX)

if __name__ == "__main__":
    os.makedirs(config.SRC_IMAGES_DIR, exist_ok=True)
    os.makedirs(config.MARKUPED_IMAGES_DIR, exist_ok=True)
    app.run(host="0.0.0.0", port=int(config.MANAGEMENT_SERVICE_URL_PORT), debug=False)
