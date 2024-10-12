import os
from flask import Flask, request, jsonify
import pandas as pd
from transformers import pipeline

app = Flask(__name__) # Initialize the Flask app

# Initialize the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# CSV file name
CSV_FILE = "cs111_reviews.csv"

@app.route('/process_evaluations', methods=['POST'])
def process_evaluations():
    # Check if the CSV file exists in the current directory
    if not os.path.exists(CSV_FILE):
        return jsonify({"error": f"CSV file '{CSV_FILE}' not found in the current directory"}), 400
    
    try:
        # Read the CSV file
        df = pd.read_csv(CSV_FILE)
        
        # Combine all text reviews into one string
        all_reviews = " ".join(df['review'].astype(str).tolist())
        
        # Summarize the combined reviews
        summary = summarizer(all_reviews, max_length=150, min_length=50, do_sample=False)[0]['summary_text']
        
        # Extract key aspects (this is a simple example, you might want to use more sophisticated NLP techniques)
        aspects = df['aspect'].value_counts().to_dict()
        
        # Prepare the response
        response = {
            "class_name": request.form.get('class_name', ''),
            "class_number": request.form.get('class_number', ''),
            "professor": request.form.get('professor', ''),
            "summary": summary,
            "key_aspects": aspects
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": f"An error occurred while processing the CSV file: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)