import os
import json
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# JSON file name
JSON_FILE = os.path.abspath(os.path.join(os.getcwd(), "..", "..", "testing", "bain_cs111.json"))

def summarize_text(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes course reviews."},
            {"role": "user", "content": f"Summarize the following course reviews: {text}"}
        ],
        max_tokens=150
    )
    return response.choices[0].message['content'].strip()

def process_evaluations():
    # Check if the JSON file exists
    if not os.path.exists(JSON_FILE):
        print(f"Error: JSON file '{JSON_FILE}' not found")
        return

    try:
        # Read the JSON file
        with open(JSON_FILE, 'r') as file:
            data = json.load(file)
        
        # Combine all text reviews into one string
        all_reviews = " ".join([review['text'] for review in data['reviews']])
        
        # Summarize the combined reviews using OpenAI
        summary = summarize_text(all_reviews)
        
        # Extract key aspects
        aspects = {}
        for review in data['reviews']:
            for aspect in review['aspects']:
                aspects[aspect] = aspects.get(aspect, 0) + 1
        
        # Prepare the response
        response = {
            "class_name": data.get('class_name', ''),
            "class_number": data.get('class_number', ''),
            "professor": data.get('professor', ''),
            "summary": summary,
            "key_aspects": aspects
        }
        
        # Print the response
        print("Processed Evaluation:")
        print(f"Class: {response['class_name']} {response['class_number']}")
        print(f"Professor: {response['professor']}")
        print(f"\nSummary: {response['summary']}")
        print("\nKey Aspects:")
        for aspect, count in response['key_aspects'].items():
            print(f"- {aspect}: {count}")

    except Exception as e:
        print(f"An error occurred while processing the JSON file: {str(e)}")

if __name__ == '__main__':
    process_evaluations()