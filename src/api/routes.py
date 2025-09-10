from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Incident, Reservation
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from flask_mail import Mail, Message

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend."
    }
    return jsonify(response_body), 200


@api.route('/user/register', methods=['POST'])
def create_user():
    email = request.json.get('email')
    if email is None:
        return 'Email is required', 400

    user = User.query.filter_by(email=email).first()
    if user:
        return "User already exists", 400

    password = request.json.get('password')
    if password is None:
        return 'Password is required', 400
    elif len(password) < 8:
        return 'Password should be at least 8 characters long', 400

    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    apartment = request.json.get('apartment')
    role = request.json.get('role')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        role=role,
        apartment=apartment,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    # Enviar correo de bienvenida
    try:
        mail = Mail(current_app)
        msg = Message(
            subject="🎉 Bienvenido al portal del edificio",
            recipients=[email]
        )
        msg.html = f"""
        <h2>Hola {first_name},</h2>
        <p>Tu cuenta ha sido registrada exitosamente en el portal del edificio.</p>
        <p>Tu contraseña temporal es: <strong>12345678</strong></p>
        <p>Por favor, inicia sesión y cámbiala lo antes posible.</p>
        <br/>
        <p>Gracias,</p>
        <p><em>Equipo de Administración</em></p>
        """
        mail.send(msg)
        print(f"Correo enviado a {email}")
    except Exception as e:
        print(f"Error al enviar correo: {e}")

    return 'User created and email sent ✅', 200


@api.route('/user/login', methods=['POST'])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({'message': 'El correo electrónico y la contraseña son obligatorios'}), 400

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'message': 'Correo electrónico o contraseña inválida'}), 400

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'La contraseña es incorrecta'}), 400

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user": user.serialize(), "role": user.role}), 200


@api.route("/report", methods=['POST'])
def report_incidence():
    data = request.json
    print("Datos recibidos:", data)

    try:
        new_incident = Incident(
            name=data.get("name"),
            email=data.get("email"),
            apartment=data.get("apartment"),
            title=data.get("title"),
            description=data.get("description")
        )

        db.session.add(new_incident)
        db.session.commit()

        return jsonify({
            "message": "Reporte guardado exitosamente",
            "incident": new_incident.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Error al guardar el reporte",
            "error": str(e)
        }), 500


@api.route("/user/listreservas", methods=["GET"])
def listar_reservas():
    # Esto probablemente deberías conectarlo a la base de datos
    return jsonify(reservas), 200


@api.route("/user/reserva", methods=["POST"])
def crear_reserva():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    first_name = data.get("first_name")
    type = data.get("type")
    email = data.get("email")
    phone = data.get("phone")
    apartment = data.get("apartment")
    description = data.get("description")
    hora = data.get("hora")
    reservationpacking = data.get("reservationpacking")
    reservationbbq = data.get("reservationbbq")

    if not first_name or not type or not email or not phone:
        return jsonify({"error": "first_name, type, email y phone son obligatorios"}), 400

    try:
        if isinstance(hora, str):
            hora = datetime.fromisoformat(hora)
    except Exception:
        return jsonify({"error": "Formato de hora inválido. Usa YYYY-MM-DDTHH:MM:SS"}), 400

    nueva_reserva = Reservation(
        first_name=first_name,
        type=type,
        email=email,
        phone=phone,
        apartment=apartment,
        description=description,
        hora=hora,
        reservationpacking=reservationpacking,
        reservationbbq=reservationbbq,
    )

    db.session.add(nueva_reserva)
    db.session.commit()

    return jsonify({
        "message": "Reserva creada ✅",
        "reserva": nueva_reserva.serialize()
    }), 201


@api.route("/user/reservas/<int:id>", methods=["PUT"])
def actualizar_reserva(id):
    data = request.get_json()
    for r in reservas:
        if r["id"] == id:
            r.update(data)
            return jsonify({
                "message": "Reserva actualizada ✅",
                "reserva": r
            }), 200
    return jsonify({"error": "Reserva no encontrada"}), 404


@api.route("/user/reservas/<int:id>", methods=["DELETE"])
def eliminar_reserva(id):
    global reservas
    reservas = [r for r in reservas if r["id"] != id]
    return jsonify({"message": "Reserva eliminada ✅"}), 200
