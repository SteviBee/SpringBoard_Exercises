"""Adpot application."""
from flask import Flask, request, redirect, render_template, session
from flask.helpers import flash
from models import db, connect_db, Pet
from flask_debugtoolbar import DebugToolbarExtension

from forms import AddPetForm
from forms import EditPetForm


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

db.create_all()




@app.route("/")
def show_homepage():
    """show homepage"""

    pets = Pet.query.all()

    return render_template("index.html", pets=pets)

@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """add pet"""

    form = AddPetForm()

    if form.validate_on_submit():
        # name = form.name.data
        # species = form.species.data
        # photo_url = form.photo_url.data
        # age = form.age.data
        # notes = form.notes.data

        # Adding data automatically as well as add, then commit
        data = {k: v for k, v in form.data.items() if k != "csrf_token"}
        # **data = takes all the k v pairs
        new_pet = Pet(**data)
        # new_pet = Pet(name=form.name.data, age=form.age.data, ...)
        db.session.add(new_pet)
        db.session.commit()

        flash(f"Added {new_pet.name}!")
        return redirect("/")

    else:
        return render_template("add.html", form=form)


@app.route("/<int:pet_id>", methods=["GET", "POST"])
def edit_pet(pet_id):
    """edit pet"""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.photo_url = form.photo_url.data
        db.session.commit()

        flash(f"Updated {pet.name}!")
        return redirect("/")

    else:
        return render_template("edit.html", form=form)
