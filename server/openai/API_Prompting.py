import os
import json
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# JSON file name
JSON_FILE = r"C:\ESW2024\WildHacks2024\ctec-bot\testing\WORKING_JSON.json"

def analyze_reviews(text):
    response = openai.ChatCompletion.create(
       model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI assistant that analyzes course reviews in the style of Amazon product reviews."},
            {"role": "user", "content": f"""
            Analyze the following course reviews and provide:
            1. A detailed "Students say" summary (3-4 sentences) that highlights the main points students mention, including both positive and negative aspects. Begin with "Students say" and then provide a comprehensive overview of student opinions.
            2. A list of pros (3-5 items).
            3. A list of cons (3-5 items).
            4. A list of neutral aspects (0-3 items).
            5. A star rating out of 5, based on the overall sentiment.

            For the pros, cons, and neutral sections, use only the following tags if applicable:

            Positive Tags:
            Engaging Professor
            Helpful TAs
            Great Introduction to CS
            Supportive Environment
            Flexible Grading
            Challenging but Rewarding
            Encourages Collaboration

            Neutral Tags:
            Lenient Grading
            Flexible Schedule
            Requires Office Hours

            Negative Tags:
            Challenging Syntax
            Fast-Paced for Beginners
            Frustrating Language Choice
            Pacing Imbalance
            Workload Heavier than Expected
            Limited Practical Application

            Use only these exact tags as the outputs for the pros, cons, and neutral sections. Each section can have more than one tag. If some tags are not applicable based on your analysis, do not use them.

            Format the output as a JSON object with keys: "summary", "pros", "cons", "neutral", and "rating".
            Ensure the summary is detailed and covers multiple aspects of student feedback.

            Course reviews: {text}
            """}
        ],
        max_tokens=1500
    )
    return json.loads(response.choices[0].message['content'].strip())

def process_evaluations(data):
    # if not os.path.exists(JSON_FILE):
    #     print(f"Error: JSON file '{JSON_FILE}' not found")
    #     return
    print("starting the process_evaluations!")
    try:
        # with open(JSON_FILE, 'r') as file:
        #     data = json.load(file)
        
        class_name = list(data.keys())[0]
        class_number = list(data[class_name].keys())[0]
        professor = list(data[class_name][class_number].keys())[0]
        reviews_text = data[class_name][class_number][professor]["Responses"][0]
        
        analysis = analyze_reviews(reviews_text)
        
        print (analysis)
        # print(f"Course: {class_name} {class_number}")
        # print(f"Professor: {professor}")
        # print(f"\nRating: {analysis['rating']} out of 5 stars")
        # print(f"\nStudents say:")
        # print(analysis['summary'])
        # print("\nPros:")
        # for pro in analysis['pros']:
        #     print(f"- {pro}")
        # print("\nCons:")
        # for con in analysis['cons']:
        #     print(f"- {con}")
        return analysis
    except Exception as e:
        print(f"An error occurred while processing the JSON file: {str(e)}")

if __name__ == '__main__':
    process_evaluations()