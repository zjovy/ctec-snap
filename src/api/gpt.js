import axios from 'axios';

// Function to call the backend API
const fetchGptResponse = async (major, course, professor) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/gptResponse?department=${major}&course=${course}&professor=${professor}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();  // Parse the JSON
        return data;
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        return null;
    }
};


export default fetchGptResponse;
