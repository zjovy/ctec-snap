from flask import Flask
import firebase_admin
from firebase_admin import credentials, db
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', r'C:\Users\mhenr\Documents\Github\ctec-bot\server\openai')))

from API_Prompting import process_evaluations

# Initialize Firebase
cred = credentials.Certificate(r"C:\Users\mhenr\Downloads\ctec-snap-firebase-adminsdk-x90z8-ac3e68052c.json")
firebase_admin.initialize_app(cred, {'databaseURL':'https://ctec-snap-default-rtdb.firebaseio.com'})
ref = db.reference('/')




app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"


@app.route("/gptResponse", methods=['GET'])
def gptResponse():
   return process_evaluations(ref.get())

#   return process_evaluations(json_file)


if __name__ == "__main__":
  app.run()