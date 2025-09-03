"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api, Bcrypt
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager


#def setup_admin(app):
    #from flask_admin import Admin

    #admin = Admin(app, name='Condo Connect', template_mode='bootstrap3')
    # Aquí registramos Incident
    #admin.add_view(ModelView(Incident, db.session))


# Entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Carpeta de archivos estáticos (frontend build)
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')

# Crear app
app = Flask(__name__)
bcrypt = Bcrypt()
# SECRET_KEY
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
app.url_map.strict_slashes = False


# Configuración DB

bcrypt.init_app(app)
JWTManager(app)
# database condiguration

db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Migraciones DB
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)



# add the admin
setup_admin(app)


# Admin
setup_admin(app)
setup_commands(app)

# Rutas API (BluePrints)
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Endpoint de prueba para React
incidents_storage = []

@app.route("/incidents", methods=["POST"])
def create_incident():
    data = request.get_json()
    print("Recibido en backend:", data)
    
    # Guardar en la lista
    incidents_storage.append(data)

    return jsonify({"message": "Reporte recibido correctamente"}), 200


@app.route("/incidents", methods=["GET"])
def get_incidents():
    # Devolver todos los incidentes
    return jsonify(incidents_storage), 200


# Sitemap
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Servir cualquier otro archivo estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # evitar cache
    return response

# Ejecutar servidor
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='localhost', port=PORT, debug=True)
