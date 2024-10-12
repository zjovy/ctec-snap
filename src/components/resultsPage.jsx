import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const content = [
        "Here are several sentences of information.",
        "This is a sample modal displaying details.",
        "You can close this modal by clicking the button below.",
    ];

    const reviewData = {
        name: "John Doe",
        rating: 3, // Rating out of 5
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

    const ReviewSummary = ({ name, rating, summary, tags }) => {
        return (
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg h-full w-screen p-10">
                <h2 className="text-3xl font-semibold text-[#646b96]">Professor {name}</h2>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
                                ★
                            </span>
                        ))}
                    </span>
                    <span className="ml-2 text-gray-600">{rating} out of 5</span>
                </div>
                <p className="text-gray-700 mb-4">{summary}</p>
                <div class="flex flex-column mb-4">
                    <div class="mr-5">Pros:</div>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <button
                                key={index}
                                className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                onClick={handleOpen} // Replace with your logic
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div class="flex flex-column mb-4">
                    <div class="mr-5">Nuetral:</div>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <button
                                key={index}
                                className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                onClick={handleOpen} // Replace with your logic
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div class="flex flex-column mb-4">
                    <div class="mr-5">Cons:</div>
                    <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                            <button
                                key={index}
                                className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                onClick={handleOpen} // Replace with your logic
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <button 
                    class="bg-[#f172ac] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#fbbee6] transition mt-3"
                    onClick={navigateBackToSearch}>
                        Back to Search
                </button>
            </div>
        );
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const Modal = ({ isOpen, onClose, content, attribute}) => {
        if (!isOpen) return null; // Do not render if not open
    
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
                    <h2 className="text-xl font-semibold mb-4">{attribute}</h2>
                    <h3 className="text-l font-semibold mb-4">Here's what students have to say about this: </h3>
                    <p className="mb-4">
                            {content.map((item, index) => (
                                <li key={index} className="mb-2">
                                    {item}
                                </li>
                            ))}
                        </p>
                    <button
                        class="mt-4 bg-[#f172ac] text-white rounded px-4 hover:bg-[#fbbee6]"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    const navigateBackToSearch = () => {
        navigate('/'); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-20 w-screen h-screen font-mono">
            <ReviewSummary 
                name={reviewData.name} 
                rating={reviewData.rating} 
                summary={reviewData.summary} 
                tags={reviewData.tags} 
            />
            <Modal isOpen={isOpen} onClose={handleClose} content={content} attribute={"Good"}/>
        </div>
    );
}

export default ResultsPage