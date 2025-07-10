from flask import Flask, send_from_directory
from flask_cors import CORS
from config import config
from routes.markup_routes import markup_bp
import os

app = Flask(__name__)
CORS(app)
app.config.from_object(config)

app.register_blueprint(markup_bp, url_prefix=config.MARKUP_SERVICE_URL_PREFIX)

if __name__ == "__main__":
    os.makedirs(config.SRC_IMAGES_DIR, exist_ok=True)
    os.makedirs(config.MARKUPED_IMAGES_DIR, exist_ok=True)
    app.run(host="0.0.0.0", port=5000, debug=False)
