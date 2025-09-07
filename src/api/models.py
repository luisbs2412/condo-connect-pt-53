from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "role": self.role
            # do not serialize the password, its a security breach
        }
    
class Reservation(db.Model):
 id: Mapped[int] = mapped_column(primary_key=True)
 first_name: Mapped[str] = mapped_column(String(50), nullable=False)
 type: Mapped[str] = mapped_column(String(50), nullable=False)
 email: Mapped[str] = mapped_column(String(120), unique=False, nullable=False)
 apartment: Mapped[str] = mapped_column(String(50), nullable=True)
 description: Mapped[str] = mapped_column(String(250), nullable=True)
 phone: Mapped[str] = mapped_column(String(20), nullable=True) 
 hora: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
 reservationpacking: Mapped[str] = mapped_column(String(50), nullable=True)
 reservationbbq: Mapped[str] = mapped_column(String(50), nullable=True)
 

 def serialize(self):
     return {
         "id": self.id,
         "email": self.email,
         "type": self.type,
         "phone": self.phone,
         "apartment": self.apartment,
         "description": self.description,
         "hora": self.hora.strftime("%Y-%m-%dT%H:%M:%S"), # solo hora en formato HH:MM:SS
         "reservationpacking": self.reservationpacking,
         "reservationbbq": self.reservationbbq
     }
    
class Incident(db.Model):
    id:Mapped[int]= mapped_column(primary_key=True)
    name:Mapped[str]= mapped_column(String(120), nullable=False)
    email:Mapped[str]= mapped_column(String(120), nullable=False)
    apartment:Mapped[int]= mapped_column(String(4), nullable=False)
    title:Mapped[str]= mapped_column(String(120), nullable=False)
    description:Mapped[str]= mapped_column(String(250), nullable=False)

    def __repr__(self):
        return f"<Incident {self.title}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "apartment": self.apartment,
            "title": self.title,
            "description": self.description,
        }
