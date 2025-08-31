"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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
@api.route("/user/reservas", methods=["POST"])
def crear_reserva():
    data = request.get_json()
    data["id"] = len(reservas) + 1  # asignamos un ID automático
    reservas.append(data)
    return jsonify({
        "message": "Reserva creada ✅",
        "reserva": data
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
