from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.user_name,
            # do not serialize the password, its a security breach
        }
    
class Producto_seco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(120), unique=True, nullable=False)
    Peso_cantidad = db.Column(db.String(120), unique=False, nullable=False)
    Formato = db.Column(db.String(80), unique=False, nullable=False)
    Notas = db.Column(db.String(300), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<User {self.Nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "Nombre": self.Nombre,
            "Peso_cantidad": self.Peso_cantidad,
            "Formato": self.Formato,
            "Notas": self.Notas,
            # do not serialize the password, its a security breach
        }