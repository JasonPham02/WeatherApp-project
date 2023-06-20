from flask import Flask, render_template, send_from_directory, request
import requests
import sqlite3

app = Flask(__name__, static_folder='static')

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    response.headers["Vary"] = "Accept-Encoding"
    return response


@app.route('/')
def weather():
    return render_template("index.html")

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")


@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)




