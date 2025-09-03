from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Importar tus rutas
from . import routes

