from flask import Blueprint, render_template

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def weather():
    return render_template("index.html")

@main_routes.route('/thankyou')
def thankyou():
    return render_template("thankyou.html")