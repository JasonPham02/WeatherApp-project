from flask import Blueprint, render_template, jsonify, request
import os  
import requests

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def weather():
    return render_template("index.html")

@main_routes.route('/thankyou')
def thankyou():
    return render_template("thankyou.html")

@main_routes.route('/get_weather', methods=['GET'])
def get_weather():
    
    print(os.environ.get("OPENWEATHER_API_KEY"))
    city = request.args.get('city')
    
    #Fetch the API key from the environment variable
    api_key = os.environ.get("OPENWEATHER_API_KEY")

    #Call the OpenWeather API
    base_url = 'http://api.openweathermap.org/data/2.5/forecast'
    complete_url = f"{base_url}?q={city}&appid={api_key}"
    
    print(complete_url)

    response = requests.get(complete_url)
    data = response.json()
    
    return jsonify(data)
    
    
        
        
    