from flask import Flask, request
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

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/gptResponse", methods=['GET'])
def gptResponse():
  department = request.args.get('department')
  course = request.args.get('course')
  professor = request.args.get('professor')
  ref = db.reference(f'{department}/{course}/{professor}')
  
  return process_evaluations(ref.get())

#   return process_evaluations(json_file)

if __name__ == "__main__":
  app.run()