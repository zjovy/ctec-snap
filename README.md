# CTEC Snap

CTEC Snap is a web application designed to streamline access to course and professor ratings from Northwestern University's internal evaluation system, CTEC. The platform allows students to easily search for courses, view detailed summaries of student reviews, and make informed decisions when selecting classes.

### Built With:
- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Python, Node.js
- **API:** OpenAI GPT
- **Database:** Firebase

---

## Features

- **Course Search**: Instantly search through the CTEC database to find specific courses.
- **Review Summaries**: Utilizes OpenAI’s GPT model to summarize reviews for each course, giving a concise overview of student feedback.
- **Tagging System**: Displays pros and cons of courses, helping students quickly assess important aspects of each class.
- **Real-Time Data Access**: Uses Firebase to provide real-time search and display results for a seamless user experience.

---

## Hackathon Achievement

This project was developed during an 8-hour hackathon where we won 2nd place. The focus was on building a scalable solution to simplify the process of viewing CTECs for Northwestern students.

---

## How It Works

1. **Data Scraping**: We scrape data from the internal CTEC system to gather course ratings and student reviews.
2. **Summarization Pipeline**: A backend pipeline leverages the OpenAI GPT API to generate summaries of student feedback for each course.
3. **Tagging System**: Reviews are parsed to tag each course with pros and cons, allowing students to quickly identify key strengths and weaknesses.
4. **Frontend Display**: A simple and intuitive interface allows students to search for courses and instantly view the summarized feedback.

---

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/zjovy/CTECSnap.git
    cd CTECSnap
    ```

2. Install frontend dependencies:
    ```bash
    cd client
    npm install
    ```

3. Set up your Firebase and OpenAI API keys:
    - Add your Firebase config in `firebaseConfig.js`.
    - Add your OpenAI API key in `.env`.

5. Run the development servers:
    - Frontend:
      ```bash
      cd client
      npm start
      ```
---

## Future Improvements

- Enhance search functionality to filter courses by specific tags or keywords.
- Introduce user accounts for personalized course recommendations.
- Add more detailed metrics for review data, such as visual graphs of rating distributions.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

- [Northwestern University CTEC System](https://www.northwestern.edu/ctec/)
- [OpenAI GPT API](https://beta.openai.com/)
- [Firebase](https://firebase.google.com/)

