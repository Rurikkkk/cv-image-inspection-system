from flask import Flask
from routes.image_management_routes import image_management_routes
import os

app = Flask(__name__)

app.register_blueprint(image_management_routes)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
