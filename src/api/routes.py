"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Producto_seco
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Servidores OK"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    user_name = request.json.get("user_name", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(user_name=user_name).first()
    
    if user is None or  user.password != password:
        return jsonify({"msg": "Error en el Nombre de Usuario o Password"}), 401

    access_token = create_access_token(identity=user_name)
    return jsonify(access_token=access_token, user_name=user_name)

# Crar un nuevo usuario
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    

    user = User.query.filter_by(email=body["email"]).first()

    if user == None:
        user = User(user_name=body["user_name"], email=body["email"], password=body["password"], is_active = True)
        db.session.add(user)
        db.session.commit()
        response_body = {
        "msg": f"El Usuario {user.user_name} se creo correctamente."
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg":"Un usuario ya existe con ese correo"}), 401
    
#Crear nuevo productor
@api.route('/producto', methods=['POST'])
@jwt_required()  # Asegura que el usuario esté autenticado
def create_product():
    body = request.get_json()
    
    current_user_id = get_jwt_identity()  # Obtiene el ID del usuario autenticado
    
    new_product = Producto_seco(
        user_id=current_user_id,
        Nombre=body['Nombre'],
        Peso_cantidad=body['Peso_cantidad'],
        Formato=body['Formato'],
        Notas=body['Notas']
    )

    db.session.add(new_product)
    db.session.commit()

    response_body = {"msg": f"El producto {new_product.Nombre} se agregó correctamente a tu alacena virtual."}
    return jsonify(response_body)
    
# Traer los productos creados
@api.route('/producto', methods=['GET'])
@jwt_required()
def get_products():
    current_user_id = get_jwt_identity()
    products = Producto_seco.query.filter_by(user_id=current_user_id).all()
    serialized_products = [product.serialize() for product in products]
    return jsonify(serialized_products)

# Traer un producto por Id
@api.route('/producto/<int:producto_id>', methods=['GET'])
def get_one_product(producto_id):
    producto = Producto_seco.query.get(producto_id)
    
    if producto is None:
        return jsonify({"error": "Producto no encontrado"}), 404

    return jsonify(producto.serialize()), 200