import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReviewSummary from './reviewSummary';

import fetchGptResponse from '../api/gpt';

const ResultsPage = () => {
    const location = useLocation();
    const [reviewData, setReviewData] = useState(null);

    const getUrlParams = () => {
        const params = new URLSearchParams(location.search);
        const professor = decodeURIComponent(params.get('professor'));
        const major = decodeURIComponent(params.get('major'));
        const number = decodeURIComponent(params.get('number'));
        return { professor, major, number };
    };

    const { professor, major, number } = getUrlParams();

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchGptResponse(major, number, professor); // Call the backend
            if (data) {
                setReviewData(data); // Set the received data to state
                console.log(reviewData)
            }
        };
        fetchData();
    }, []); // Re-run when any of these change

    // Show a loading state while data is being fetched
    if (!reviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-20 w-screen h-screen font-mono">
            <ReviewSummary 
                name={reviewData.name} 
                rating={reviewData.rating} 
                summary={reviewData.summary} 
                tags={reviewData.tags} 
            />
        </div>
    );
}

export default ResultsPage