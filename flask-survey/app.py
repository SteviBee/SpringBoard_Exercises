from types import MethodType
from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
# From survey file import instances needed:
from surveys import satisfaction_survey, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"]=False

debug = DebugToolbarExtension(app)

# initializing empty list to record users responses
responses = []


# homepage for user responses
@app.route("/")
def ask_prompt():
    """Generates a button to start the survey"""

    survey_title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template("start.html", body_title=survey_title, display_instructions=instructions)

@app.route("/questions/<int:q>")
def show_question(q):
    """handles URL PARAM, then displays current quesation, and a form that sends to answer page"""
    
    # Validating number in URL is what it should be:
    if q != len(responses):
        q = len(responses)
        # q_next = q + 1 
        flash("Invalid question number, redirecting to correct question")
        return redirect(f"/questions/{q}")

    questions_text = satisfaction_survey.questions[q].question
    # print("Q", questions_text)
    return render_template("/question-form.html",question=questions_text, q_id=q)


@app.route("/answer/<int:q>", methods=["POST"])
def handle_answer(q):
    """takes query params and appends them to response list, then redirects"""
    
    ans = request.args.get("answer")
    responses.append(ans)

    # Creating logic to check if instance was added:
    if len(responses) < len(satisfaction_survey.questions):    
        flash("Answer Successfully Recorded!")
        q_next = q + 1 
        return redirect(f"/questions/{q_next}")
    else:
        return redirect("/thank-you")

@app.route("/thank-you")
def thank_you():
    return render_template("thank-you.html")
    
