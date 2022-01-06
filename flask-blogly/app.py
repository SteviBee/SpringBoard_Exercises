"""Blogly application."""

from flask import Flask, request, redirect, render_template
from flask.helpers import flash
from models import db, connect_db, User, Post
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

db.create_all()

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
    # no need to query twice when you can set up a relationship and tie posts to user
    # posts = db.session.query(Post).all()    posts=posts)
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

# POST ROUTES ---------------------------------------------

# GET /users/[user-id]/posts/new
@app.route("/users/<int:user_id>/posts/new")
def add_new_post(user_id):
    """Show form to add a post for that user"""
    user = User.query.get(user_id)

    return render_template("add-user-post.html", user=user)


# POST /users/[user-id]/posts/new
@app.route("/users/<int:user_id>/posts/new", methods=['POST'])
def add_new_post_to_DB(user_id):
    """Handle add form; add post and redirect to the user detail page"""
    new_title = request.form['new-title'] 
    new_content = request.form['new-content']
    user_id = user_id

    # NOTE - you must send the relationship data too. user=user
    try:
        user = User.query.get_or_404(user_id)
        post = Post(title=new_title, content=new_content, user=user)
        db.session.add(post)  
        db.session.commit()
        flash(f'Post titled {new_title} was successfully added')
        return redirect(f"/users/{ str(user_id) }")
    except:
        flash(f'Error. Please try again')
        return redirect(f"/users/{ str(user_id)}/posts/new")

# GET /posts/[post-id]
@app.route("/posts/<int:post_id>")
def show_post(post_id):
    """Show a post."""
    post = Post.query.get(post_id)

    return render_template("post_details.html", post=post)

# GET /posts/[post-id]/edit
@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    """Show form to edit a post, and to cancel (back to user page)."""
    post = Post.query.get(post_id)
    return render_template('edit-post.html', post=post)

# POST /posts/[post-id]/edit
@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def post_edit_post(post_id):
    """Handle editing of a post. Redirect back to the post view."""
    
    # Call the current post and update from the new info:
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    
    db.session.add(post)
    db.session.commit()
    flash(f'Post {post.title} edited')

    return redirect(f'/posts/{post_id}')

# POST /posts/[post-id]/delete
@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete the post."""
    
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash(f'{post.title} was successfully deleted')
    return redirect('/')
