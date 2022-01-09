"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, BooleanField
from wtforms.validators import Length, InputRequired, Optional, NumberRange, URL


# Creating add_pet class:
class AddPetForm(FlaskForm):
    """Form for adding pets"""

    # Pet name
    name = StringField("Pet Name",
                       validators=[InputRequired()])
    # Species
    species = SelectField("Species", choices=[('c', 'Cat'), ('d', 'Dog'), ('p', 'porcupine')])
    # Photo URL
    photo_url = StringField("Picture",
                            validators=[Optional(), URL(require_tld=True, message="Error, please use another URL")])
    # Age
    age = IntegerField("Age",
                       validators=[Optional(), NumberRange(min=0, max=30, message="Please enter age between 0-30 years")])
    # Notes
    notes = StringField("Notes",
                       validators=[Optional()])

class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    photo_url = StringField(
        "Photo URL",
        validators=[Optional(), URL()],
    )

    notes = TextAreaField(
        "Comments",
        validators=[Optional(), Length(min=10)],
    )

    available = BooleanField("Available?")