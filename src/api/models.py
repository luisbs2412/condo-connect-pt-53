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
 

 def serialize(self):
     return {
         "id": self.id,
         "email": self.email,
         "type": self.type,
         "phone": self.phone,
         "apartment": self.apartment,
         "description": self.description,
         "hora": self.hora.strftime("%Y-%m-%dT%H:%M:%S") # solo hora en formato HH:MM:SS
     }