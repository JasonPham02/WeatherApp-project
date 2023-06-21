from flask import Flask, render_template, send_from_directory, request, g
import sqlite3

app = Flask(__name__, static_folder='static')

# Configuration
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["DATABASE"] = "WeatherApp.db"

# Connect to the database
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(app.config["DATABASE"])
    return db

# Close the database connection at the end of each request
@app.teardown_appcontext
def close_db(error):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

@app.route('/')
def weather():
    return render_template("index.html")

@app.route("/feedback", methods=["GET", "POST"])
def feedback():
    if request.method == "POST":
        firstname = request.form.get("first-name")
        lastname = request.form.get("last-name")
        emailuser = request.form.get("email")
        messageuser = request.form.get("message")
        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)",
                       (firstname, lastname, emailuser))
        user_id = cursor.lastrowid  # Get the last inserted user_id
        cursor.execute("INSERT INTO feedback (user_id, message) VALUES (?, ?)", (user_id, messageuser))
        db.commit()
        return render_template("thankyou.html")
    else:
        return render_template("feedback.html")

@app.route('/thankyou')
def thankyou():
    return render_template("thankyou.html")

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
