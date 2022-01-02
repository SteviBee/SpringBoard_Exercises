"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User Class"""

    __tablenname__ = "users"

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    first_name = db.Column(db.String(50),
                            nullable=False,
                            unique=True)
    last_name = db.Column(db.String(50),
                            nullable=False,
                            unique=True)
    image_url = db.Column(db.Text,
                            nullable=True,
                            default = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    # image_url = db.Column(db.Text)

    def get_full_name(self):
        """"Retrives full user name"""

        return f"{self.last_name}, {self.first_name}"