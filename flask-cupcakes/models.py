"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Cupcake(db.Model):
    """Cupcake Class"""

    __tablename__ = "cupcake"

    # id: a unique primary key that is an auto-incrementing integer
    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )    

    # flavor: a not-nullable text column
    flavor = db.Column(
        db.Text,
        nullable=False
    )

    # size: a not-nullable text column
    size = db.Column(
        db.Text,
        nullable=False
    )

    # rating: a not-nullable column that is a float
    rating = db.Column(
        db.Float,
        nullable=False
    )    

    # image: a non-nullable text column. If an image is not given, default to https://tinyurl.com/demo-cupcake
    image = db.Column(
        db.Text,
        nullable=False,
        default="https://tinyurl.com/demo-cupcake"
    )

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
