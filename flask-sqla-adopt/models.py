"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Create a single model, Pet. This models a pet potentially available for adoption:
class Pet(db.Model):
    """Pet Class"""

    __tablename__ = "pets"

    # id: auto-incrementing integer
    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    # name: text, required
    name = db.Column(db.Text,
                    nullable=False)
    # species: text, required
    species = db.Column(db.Text,
                    nullable=False)
    # photo_url: text, optional
    photo_url = db.Column(db.Text,
                    nullable=True,
                    default="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0fGVufDB8fDB8fA%3D%3D&w=1000&q=80")   
    # age: integer, optional
    age = db.Column(db.Integer,
                    nullable=True)
    # notes: text, optional
    notes = db.Column(db.Text,
                    nullable=True)
    # available: true/false, required, should default to available
    available = db.Column(db.Boolean,
                    nullable=False,
                    default=True)


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)