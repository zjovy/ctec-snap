from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials, db
import os
import sys

path_to_append = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'server', 'openai'))
sys.path.append(path_to_append)

from API_Prompting import process_evaluations

# Initialize Firebase
cred = credentials.Certificate(r"firebase-adminsdk.json")
firebase_admin.initialize_app(cred, {'databaseURL':'https://ctec-snap-default-rtdb.firebaseio.com'})
ref = db.reference('/')

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/gptResponse": {"origins": "http://localhost:5173"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/gptResponse", methods=['GET', 'OPTIONS'])
@cross_origin()
def gptResponse():
  department = request.args.get('department')
  course = request.args.get('course')
  professor = request.args.get('professor')
  ref = db.reference(f'{department}/{course}/{professor}')
  course_data = ref.get()
  
  # Pass the data to the process_evaluations function
  if course_data:
      result = process_evaluations(course_data)

      # Use jsonify to return a valid JSON response
      return jsonify(result)
  else:
      return jsonify({"error": "No data found"}), 404

if __name__ == "__main__":
  app.run()