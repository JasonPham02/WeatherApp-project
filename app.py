from flask import Flask, render_template
import requests

app = Flask(__name__)

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
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)


