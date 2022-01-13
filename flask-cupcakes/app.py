"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

# Create serialization (taking models/data and converting to json ready)
def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy object to a python dictionary."""
    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image,
    }

# Serve static page
@app.route('/')
def show_homepage():
    """Display homeage and provide outline for axios calls"""

    return render_template("index.html")


# GET /api/cupcakes
@app.route("/api/cupcakes")
def get_all_cupcakes():
    """Get data about all cupcakes."""

    cupcakes = Cupcake.query.all()
    # Make list and list comp: newlist = [expression for item in iterable if condition == True]
    # TODO - check against insomnia but WHY can I not just send entire query to either be serilzied or to JSON?
    serialized = [serialize_cupcake(c) for c in cupcakes]

    # Respond with JSON like: {cupcakes: [{id, flavor, size, rating, image}, ...]}.
    return jsonify(cupcakes=serialized)


# GET /api/cupcakes/[cupcake-id]
@app.route("/api/cupcakes/<int:cupcake_id>")
def get_single_cupcake(cupcake_id):
    """Get data about a single cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = serialize_cupcake(cupcake)

    # Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    return jsonify({"cupcake": serialized})


# POST /api/cupcakes
@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """Create a cupcake with flavor, size, rating and image data from the body of the request."""

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    # TODO - better way to handle if NO image included? 
    image = request.json["image"] or None

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcake(new_cupcake)

    # Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    return ( jsonify({"cupcake": serialized}), 201)


# PATCH /api/cupcakes/[cupcake-id]
@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
def update_cupcake(cupcake_id):
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.id = request.json.get("id", cupcake.id)
    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = request.json.get("rating", cupcake.rating)
    cupcake.image = request.json.get("image", cupcake.image)

    db.session.commit()

    # Respond with JSON of the newly-updated cupcake, like this: {cupcake: {id, flavor, size, rating, image}}.
    return jsonify(cupcake=serialize_cupcake(cupcake))


# DELETE /api/cupcakes/[cupcake-id]
@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    # Delete cupcake with the id passed in the URL. Respond with JSON like {message: "Deleted"}
    return jsonify(message="Deleted")