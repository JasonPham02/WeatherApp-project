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
    #Fetch the API key from the environment variable and check to see if the api key is missing
    api_key = os.environ.get("OPENWEATHER_API_KEY")
    
    #check to see if the api key is missing, backend error handling
    if not api_key:
        return jsonify({"error": "API key is missing"}), 500
    
    #check to see if the city is missing, backend error handling
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City input value is missing"}), 400
    
    #Call the OpenWeather API
    base_url = 'http://api.openweathermap.org/data/2.5/forecast'
    complete_url = f"{base_url}?q={city}&appid={api_key}"
    
    #Make the API call
    response = requests.get(complete_url)
    
    #Backend error handling
    if response.status_code != 200:
        return jsonify({"error": "There was an error processing with API call"}), 400
    
    #Parse the response
    data = response.json()
    if 'list' not in data:
        return jsonify({"error": "Invalid data received from OpenWeather API"}), 500
    
    return jsonify(data)
    
    
        
        
    