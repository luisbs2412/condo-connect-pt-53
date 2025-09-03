import os
from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Inicializa Flask
app = Flask(__name__)

# Habilita CORS para todos los dominios y métodos (para desarrollo)
CORS(app, resources={r"/*": {"origins": "*"}})

# Para producción, en lugar de la línea anterior, usa esta (descomenta y ajusta tu frontend origin):
# CORS(app, resources={r"/*": {"origins": "https://opulent-capybara-x5r54w59x64frr6-3002.app.github.dev"}})

# Configuraciones básicas
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "mysecretkey")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "jwtsecretkey")

# Configuración base de datos
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa extensiones
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Modelo Tenant
class Tenant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    apt_number = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "apt_number": self.apt_number,
            "email": self.email,
        }

# Ruta para crear un nuevo tenant
@app.route('/tenants', methods=['POST'])
def create_tenant():
    data = request.get_json()

    # Validar campos obligatorios
    if not data or not all(k in data for k in ('name', 'apt_number', 'email')):
        return jsonify({'error': 'Missing required fields'}), 400

    # Verificar si el email ya existe
    if Tenant.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Tenant with this email already exists'}), 409

    # Crear y guardar el tenant
    new_tenant = Tenant(
        name=data['name'],
        apt_number=data['apt_number'],
        email=data['email']
    )
    db.session.add(new_tenant)
    db.session.commit()

    return jsonify(new_tenant.serialize()), 201

# Ruta de prueba para la API
@app.route('/')
def home():
    return jsonify({"message": "API is running"})

# Servir archivos estáticos (por ejemplo React build)
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(static_file_dir, path)

# Ejecutar la app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv("PORT", 3001)))
