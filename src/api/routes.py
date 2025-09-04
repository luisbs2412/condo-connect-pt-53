"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reservation
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

reservas = []


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/user/listreservas", methods=["GET"])
def listar_reservas():
   # return 'estoy conectado', 200
    return jsonify(reservas), 200

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
        hora=hora
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


@api.route("/api/reservas/<int:id>", methods=["DELETE"])
def eliminar_reserva(id):
    global reservas
    reservas = [r for r in reservas if r["id"] != id]
    return jsonify({"message": "Reserva eliminada ✅"}), 200
