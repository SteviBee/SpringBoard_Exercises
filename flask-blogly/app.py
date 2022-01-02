"""Blogly application."""

from flask import Flask, request, redirect, render_template
from flask.helpers import flash
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

@app.route("/")
def list_users():
    """List users"""
    users = User.query.all()

    return render_template("list.html", users=users)

@app.route("/users")
def list_details_users():
    """List users and show add form."""
    users = User.query.all()

    return render_template("index.html", users=users)

@app.route("/users/<int:user_id>")
def detail_user(user_id):
    """Show details of a single user"""

    user = User.query.get_or_404(user_id)
    return render_template("details.html", user=user)

@app.route("/users/<int:user_id>/delete")
def delete_user(user_id):
    """Delete details of a single user"""

    user = User.query.get(user_id)
    flash(f'{user.first_name} was successfully deleted')

    db.session.delete(user)  
    db.session.commit()

    return redirect("/")

@app.route("/users/<int:user_id>/edit")
def display_form(user_id):
    """edit details of a single user"""

    user = User.query.get(user_id)

    return render_template("edit.html", user=user)

@app.route("/users/<int:user_id>/edit", methods=['POST'])
def edit_user(user_id):
    """edit details of a single user"""
    user_old = User.query.get(user_id)

    user_old.first_name = request.form['first']
    user_old.last_name  = request.form['last']
    user_old.image_url  = request.form['url']
    
    flash(f'{user_old.first_name} was successfully edited')

    # user = User(first_name=first, last_name=last, image_url=url)

    # db.session.add(user)  
    db.session.commit()

    return redirect("/")
@app.route("/users/new")
def show_form():
    """Display new user form"""
    return render_template("create.html")

@app.route("/users", methods=['POST'])
def create_user():
    """create new  user"""

    first = request.form['first'] 
    last = request.form['last']
    url = request.form['url']
    try:
        user = User(first_name=first, last_name=last, image_url=url)
        db.session.add(user)  
        db.session.commit()
        flash(f'{first} {last} was successfully added')
        return redirect("/users")
    except:
        flash(f'First name: {first} or last name: {last} are already taken. Please fix and try again')
        return redirect("/create")