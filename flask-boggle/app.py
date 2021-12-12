from flask.json import jsonify
from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, make_response
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

boggle_game = Boggle()

app.config["SECRET_KEY"] = "4534gdghjk5d#$RGR^HDG"
debug = DebugToolbarExtension(app)

# GOAL here is to make a working app to practice runnign tests on

@app.route('/')
def index():
    """Show homepage and display board"""


    display_board_dict = boggle_game.make_board()
    session['board'] = display_board_dict
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    return render_template("index.html", display_board=display_board_dict,                            
                            highscore=highscore,
                           nplays=nplays)

@app.route("/check-guess")
def check_guess():
    """Use the class function to check if guess is correct"""

    word = request.args["word"]
    board = session["board"]
    # Will responsed with ok, not on board, or not work depending
    resp = boggle_game.check_valid_word(board, word)

    return jsonify({"result": resp})

@app.route("/post-score", methods=["POST"])
def post_score():
    """Receives score, updates #players & High Score, if ok"""

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)

