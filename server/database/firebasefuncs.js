import { ref, get } from 'firebase/database';
import db from './firebase.js';

// Fetch list of available majors and courses
export const fetchMajorsAndCourses = async () => {
    const majorRef = ref(db, '/');
    try {
        const snapshot = await get(majorRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const majors = Object.keys(data);
            const coursesByMajor = {};

            // Iterate through each major to get course numbers
            majors.forEach(major => {
                const courseNumbers = Object.keys(data[major]);
                coursesByMajor[major] = courseNumbers;
            });

            return { majors, coursesByMajor };
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Fetch professors for a specific course
export const fetchProfessors = async (major, courseNumber) => {
    const courseRef = ref(db, `/${major}/${courseNumber}`);
    try {
        const snapshot = await get(courseRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const professors = Object.keys(data); // List of professors for the course
            return professors;
        } else {
            console.log('No data available for this course');
        }
    } catch (error) {
        console.error('Error fetching professors:', error);
    }
};

// Fetch responses (reviews) for a specific major, course number, and professor
export const fetchResponses = async (major, courseNumber, professor) => {
    const responsesRef = ref(db, `/${major}/${courseNumber}/${professor}/Responses`);
    try {
        const snapshot = await get(responsesRef);
        if (snapshot.exists()) {
            const data = snapshot.val(); // Array of responses (reviews)
            return data;  // Return the array of responses
        } else {
            console.log('No responses available for this course and professor.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching responses:', error);
        return [];
    }
};
