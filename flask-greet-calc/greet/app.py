from flask import Flask, request

app = Flask(__name__)

# /welcome
# Returns “welcome”
# /welcome/home
# Returns “welcome home”
# /welcome/back
# Return “welcome home”
# Once you’ve finished this, run the tests for it:

# $ python3 -m unittest test.py

@app.route("/")
def home_page():   
    """"Shows homepage"""
    html = """
    <html>
      <body>
        <h1>Home Page</h1>
        <p>Welcome to my simple app!</p>
        <a href='/welcome'>Go to welcome page</a>
      </body>
    """
    return html

@app.route('/welcome')
def say_wel():
    """say welcome"""
    return "welcome"

@app.route('/welcome/home')
def say_wel_home():
    """Says welcome home"""
    return "welcome home"

@app.route('/welcome/back')
def say_wel_back():
    """welcome back"""
    return "welcome back"


  