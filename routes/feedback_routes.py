from flask import Blueprint, render_template, request, current_app
import sqlite3
from .db_utils import insert_user, insert_feedback, get_user_by_email

feedback_routes = Blueprint('feedback', __name__)

@feedback_routes.route("/feedback", methods=["GET", "POST"])
def feedback():
    error_message = None
    if request.method == "POST":
        firstname = request.form.get("first-name")
        lastname = request.form.get("last-name")
        emailuser = request.form.get("email")
        messageuser = request.form.get("message")
        
        #HANDLE ERRORS WHEN FOR FEEDBACK FORM
        try:
            #Check if user already exists in the database   
            ##Returns a tuple with the user record if it exists   
            user_record = get_user_by_email(emailuser)
            if user_record:
                user_id = user_record[0]
            else:
                user_id = insert_user(firstname, lastname, emailuser)
            insert_feedback(user_id, messageuser)
            return render_template("thankyou.html")
        except sqlite3.Error as er:
            current_app.logger.error(f"Databse error: {er}")
            error_message = "There was an error processing your feedback. Please try again later."
    return render_template("feedback.html", error_message=error_message)