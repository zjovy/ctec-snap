import os
import json
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# JSON file name
JSON_FILE = r"C:\ESW2024\WildHacks2024\ctec-bot\testing\bain_cs111.json"

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

def extract_key_aspects(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that extracts key aspects from course reviews."},
            {"role": "user", "content": f"Extract and list the key aspects mentioned in these course reviews. Return the result as a Python dictionary where the keys are the aspects and the values are the number of times they are mentioned: {text}"}
        ],
        max_tokens=200
    )
    return json.loads(response.choices[0].message['content'].strip())

def process_evaluations():
    # Check if the JSON file exists
    if not os.path.exists(JSON_FILE):
        print(f"Error: JSON file '{JSON_FILE}' not found")
        return

    try:
        # Read the JSON file
        with open(JSON_FILE, 'r') as file:
            data = json.load(file)
        
        # Get the reviews text
        reviews_text = data['Responses'][0]
        
        # Summarize the reviews
        summary = summarize_text(reviews_text)
        
        # Extract key aspects
        aspects = extract_key_aspects(reviews_text)
        
        # Prepare the response
        response = {
            "class_name": "CS",  # You might want to extract this from the reviews or add it to your JSON
            "class_number": "111",  # You might want to extract this from the reviews or add it to your JSON
            "professor": "Unknown",  # You might want to extract this from the reviews or add it to your JSON
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