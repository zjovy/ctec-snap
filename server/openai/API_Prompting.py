import os
import pandas as pd
from transformers import pipeline

# Initialize the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# CSV file name
CSV_FILE = "cs111_reviews.csv"

def process_evaluations():
    # Check if the CSV file exists in the current directory
    if not os.path.exists(CSV_FILE):
        print(f"Error: CSV file '{CSV_FILE}' not found in the current directory")
        return

    try:
        # Read the CSV file
        df = pd.read_csv(CSV_FILE)
        
        # Combine all text reviews into one string
        all_reviews = " ".join(df['review'].astype(str).tolist())
        
        # Summarize the combined reviews
        summary = summarizer(all_reviews, max_length=150, min_length=50, do_sample=False)[0]['summary_text']
        
        # Extract key aspects
        aspects = df['aspect'].value_counts().to_dict()
        
        # Prepare the response
        response = {
            "class_name": "CS",  # You can modify these as needed
            "class_number": "111",
            "professor": "Example Professor",
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
        print(f"An error occurred while processing the CSV file: {str(e)}")

if __name__ == '__main__':
    process_evaluations()