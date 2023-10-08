import sqlite3
from flask import current_app

def get_db():
    return current_app._get_current_object().get_db()

# Database function
def insert_user(firstname, lastname, emailuser):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ? )", (firstname, lastname, emailuser))
    db.commit()
    return cursor.lastrowid

def insert_feedback(user_id, messageuser):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO feedback (user_id, message) VALUES (?, ?)", (user_id, messageuser))
    db.commit()

def get_user_by_email(emailuser):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (emailuser,))
    return cursor.fetchone()