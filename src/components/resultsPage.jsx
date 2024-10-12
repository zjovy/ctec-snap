import { useLocation } from 'react-router-dom';
import ReviewSummary from './reviewSummary';

const ResultsPage = () => {
    const location = useLocation();

    const reviewData = {
        name: "John Doe",
        rating: 4, // Rating out of 5
        summary: "This product is fantastic! It has changed my life for the better. Highly recommend to everyone!",
        tags: ["Excellent Quality", "Highly Recommended", "Value for Money", "Great Customer Service"],
    };


    const getUrlParams = () => {
        const params = new URLSearchParams(location.search);
        const professor = params.get('professor');
        const major = decodeURIComponent(params.get('major'));
        const number = params.get('number');
        return { professor, major, number };
    };

    const { professor, major, number } = getUrlParams();

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