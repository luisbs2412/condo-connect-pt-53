"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Incident, Reservation
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from flask_mail import Mail, Message
import traceback

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
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
        return 'Password should be max 8 characters long', 400

    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    apartment = request.json.get('apartment')
    role = request.json.get('role')
    password = request.json.get('password')

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

    # Sending Welcome Email
    send_welcome_email(email, first_name, password)

    return 'User created and email sent', 200


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
        return jsonify({'message': 'La contrseña es incorrecta'}), 400

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user": user.serialize(), "role": user.role}), 200

# Endpoint para recibir el formulario


@api.route("/report", methods=['POST'])
def report_incidence():
    data = request.json
    print("Datos recibidos:", data)

    try:
        # Crear una nueva instancia del modelo Incident
        new_incident = Incident(
            name=data.get("name"),
            email=data.get("email"),
            apartment=data.get("apartment"),
            title=data.get("title"),
            description=data.get("description")
        )

        # Guardar en la base de datos
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
 feature/reservationslist
    
    reservas = [],
    



 main
@api.route("/user/listreservas", methods=["GET"])
def listar_reservas():
        todas_las_reservas = Reservation.query.all()
        listado_reservas_serializado = [reserva.serialize() for reserva in todas_las_reservas]
        return jsonify(listado_reservas_serializado), 200

@api.route("/user/<string:email>/reservas", methods=["GET"])
def get_reservas_by_email(email):
    reservas = Reservation.query.filter_by(email=email).all()
    return jsonify([r.serialize() for r in reservas]), 200
   # return 'estoy conectado', 200
 feature/reservationslist
        #return jsonify(reservas), 200

    return jsonify(reservas), 200
 main

# POST → crear nueva reserva


# @api.route("/user/reserva", methods=["POST"])
# def crear_reserva():
#     data = request.get_json()
#     data["id"] = len(reservas) + 1  # asignamos un ID automático
#     reservas.append(data)
#     return jsonify({
#         "message": "Reserva creada ✅",
#         "reserva": data
#     }), 201
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
 feature/reservationslist
    user_id = data.get("user_id")

 main

    # Validaciones simples
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
       user_id=user_id
    )

    db.session.add(nueva_reserva)
    db.session.commit()

    return jsonify({
        "message": "Reserva creada ✅",
        "reserva": nueva_reserva.serialize()
    }), 201


# PUT → actualizar una reserva por id


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

# DELETE → eliminar una reserva por id


@api.route("/user/reservas/<int:id>", methods=["DELETE"])
def eliminar_reserva(id):
    global reservas
    reservas = [r for r in reservas if r["id"] != id]
    return jsonify({"message": "Reserva eliminada ✅"}), 200


@api.route('/incidents/<string:email>', methods=['GET'])
def get_user_incidents(email):
    try:
        incidents = Incident.query.filter_by(email=email).all()
        return jsonify([incident.serialize() for incident in incidents]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def send_welcome_email(email, first_name, password):
    try:
        mail = Mail(current_app)
        msg = Message(
            subject="Welcome to the New York resident portal",
            recipients=[email]
        )
        msg.html = f"""
             <h2>Hello {first_name},</h2>
             <p>Your account has been successfully registered in the New York Residences portal.</p>
             <p>Your temporary password is: <strong>{password}</strong></p>
             <p>Please log in and change it as soon as possible.</p>
             <br/>
             <p>Thank you,</p>
             <p><em>Condo Connect Administration Team</em></p>
             """
        mail.send(msg)

    except Exception as e:
        print("Failure sending the email: {e}")
        traceback.print_exc()
