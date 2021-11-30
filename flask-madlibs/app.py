from flask import Flask, request, render_template
from random import choice, sample
import stories

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

# testing the class. IDK if this the best way:
# print(stories.story.generate())

# Making home route
@app.route("/")
def index():
    """Return homepage"""

    return render_template("home.html")

# Making DYNAMIC form based on user inputs? Trying to keep
# backend (form submition) and front end (story display) seperate
@app.route('/form/')
def get_input_form():
    "Dynamically getting inputs for prompts of madlips"
    content_new = stories.story.prompts

    return render_template("form.html", story_prompts=content_new)

# Dealing with the data from form submition
@app.route('/submit')
def use_form_data():
    """taking user input and displaying sentence"""
    # sentence_instance = stories.story.template
 
    sentence_instance = stories.story.generate(request.args)

    return render_template("submit.html", sentence=sentence_instance)
