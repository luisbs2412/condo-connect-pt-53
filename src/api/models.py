from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Reservation(db.Model):
    id:Mapped[int]= mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    type:Mapped[str]=mapped_column(unique=True, nullable = False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "type": self.type
            # do not serialize the password, its a security breach
        }

# Reservation
# -
# id int PK
# type string
# date date
# time_start time
# time_end time
# status string
# updated_at string
# tenant_id int FK >- TenantProfile.id
# created_at datetime