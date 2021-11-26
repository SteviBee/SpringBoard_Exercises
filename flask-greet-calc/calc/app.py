# Put your app in here.
from _typeshed import OpenBinaryModeUpdating
from unittest import result
from unittest.runner import _ResultClassType
from flask import Flask, request
import operations

app = Flask(__name__)

# QUERY PARAMETERS WAY

@app.route('/add')
def op_add():
    """adds a & b GET query params to ADD route and returns str result"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    print("request is ,", request.args)
    result = operations.add(a,b)
    return f"{result}"

@app.route('/sub')
def op_sub():
    """subtract a & b GET query params to ADD route and returns str result"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = operations.sub(a,b)
    return f"{result}"

@app.route('/mult')
def op_mult():
    """mult a & b GET query params to ADD route and returns str result"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = operations.mult(a,b)
    return f"{result}"

@app.route('/div')
def op_div():
    """div a & b GET query params to ADD route and returns str result"""
    a = int(request.args["a"])
    b = int(request.args["b"])
    result = operations.div(a,b)
    return f"{result}"


# URL PARAMS WAY
@app.route('/math/<operation>')
def operation(operation):
    a = int(request.args["a"])
    b = int(request.args["b"])
    func = eval(operation)
    print("OPERATION!!", operations.func(a,b))
    result = operations.func(a,b)
    return f"{result}"


"""
Make a Flask app that responds to 4 different routes. Each route does a math operation with two numbers, a and b, which will be passed in as URL GET-style query parameters.

/add
Adds a and b and returns result as the body.
/sub
Same, subtracting b from a.
/mult
Same, multiplying a and b.
/div
Same, dividing a by b.
For example, a URL like http://localhost:5000/add?a=10&b=20 should return a string response of exactly 30.

Write the routes for this but don’t hardcode the math operation in your route function directly. Instead, we’ve provided helper functions for this in the file operations.py:
"""

