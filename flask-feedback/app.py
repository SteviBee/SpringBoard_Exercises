from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserForm, FeedbackForm, LoginForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
# TODO - ask mentor, when to have create_all() here vs. doing it manually
db.create_all() 

toolbar = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    """redirect to register."""
    # user = User.query.get_or_404()

    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def register_user():
    """Show a form that when submitted will register/create a user"""
    
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)

        db.session.add(new_user)
        try:
            db.session.commit()

        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        
        # if form.validate_on_submit() == True (which it is for POST req), THEN set session.id and flask success like regular register
        session['user_id'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{username}')

    return render_template('register.html', form=form)

@app.route("/login", methods=["GET", "POST"])
def login_user():
    """Show a form that when submitted will login a user."""
    
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        # Will return False if not authentic and the user if real
        user = User.authenticate(username, password)

        if user:
            flash(f'Welcome back {user.username}! Successfully logged in!', "info")
            # Add username to session so I can validate and keep them logged in
            session['user_id'] = user.username
            return redirect(f'/users/{user.username}')
        
        # if form.validate_on_submit() == True (which it is for POST req), THEN set session.id and flask success like regular register
        else:
            form.username.errors = ["Invalid login, please try again"]
            return render_template('login.html', form=form)

    return render_template('login.html', form=form)

@app.route("/logout", methods=["POST"])
def logout_user():
    """Clear session and redirect user to homepage"""
    session.pop("user_id")
    flash("Goodbye!", "info")
    return redirect('/')

@app.route('/users/<username>')
def show_secert(username):

    # autherized users only!
    # if "user_id" not in session:
    #     flash("Please login first!", "danger")
    #     return redirect('/')

    if "user_id" not in session or session["user_id"]!= username:
        flash("Please login first!", "danger")
        return redirect('/')

    user = User.query.get_or_404(username)

    # TODO - why form here?
    # users_feedback = Feedback.query.filter(username==user.username).all()

    return render_template("secert.html", user=user)

# FEEDBACK ROUTES:

@app.route('/users/<username>/delete')
def delete_user(username):
    """Delete User"""
    # autherized users only!
    if "user_id" not in session or session["user_id"]!= username:
        flash("Please login first!", "danger")
        return redirect('/')

    # Delete feedback first then user:
    user = User.query.get_or_404(username)
    db.session.delete(user)

    db.session.commit()
    session.pop("user_id")
    flash("User and all feedback deleted", "info")
    return redirect("/")

@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    """Add feedback from a logged in user"""

    # autherized users only!
    if session["user_id"] != username:
        flash("Please login first!", "danger")
        return redirect('/')

    # Make form and validate
    form = FeedbackForm()
    
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()
        flash("Added new feedback", "success")
        return redirect(f"/users/{username}")
    
    return render_template("add-feedback.html", form=form)

@app.route('/feedback/<feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    """delete specific feedback from that user only"""

    feedback = Feedback.query.get_or_404(feedback_id)
    
    # autherized users only!
    if session["user_id"] != feedback.user.username:
        flash("Please login first!", "danger")
        return redirect('/')

    db.session.delete(feedback)
    db.session.commit()
    flash("Feedback deleted", "info")

    return redirect(f'/users/{feedback.user.username}')

@app.route('/feedback/<feedback_id>/update', methods=["GET", "POST"])
def update_user(feedback_id):
    """"Update feedback ONLY for autherized user"""
    
    feedback = Feedback.query.get_or_404(feedback_id)
    
    # autherized users only!
    if session["user_id"] != feedback.user.username:
        flash("Please login first!", "danger")
        return redirect('/')

    form = FeedbackForm()
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()

        flash('Feedback updated!', "success")
        return redirect(f'/users/{feedback.user.username}')

    return render_template('feedback-update.html', form=form)