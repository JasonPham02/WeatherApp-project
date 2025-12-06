from flask import Flask, render_template, g
import sqlite3
import os
from dotenv import load_dotenv
load_dotenv()

#API Optimizing with Caching
#configure the cache
    
def create_app():
    app = Flask(__name__)
    # Configure cache
    
    # Configuration
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config["DATABASE"] = os.environ.get("DATABASE_URL", "default.db")

    # Connect to the database
    def get_db():
        db = getattr(g, "_database", None)
        if db is None:
            db = g._database = sqlite3.connect(app.config["DATABASE"]) 
        return db
    app.get_db = get_db

    # Close the database connection at the end of each request
    @app.teardown_appcontext
    def close_db(error):
        db = getattr(g, "_database", None)
        if db is not None:
            db.close()

    # Register the blueprints
    from routes.main_routes import main_routes
    from routes.feedback_routes import feedback_routes
    app.register_blueprint(main_routes)
    app.register_blueprint(feedback_routes)

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404
    
    return app

app = create_app()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
