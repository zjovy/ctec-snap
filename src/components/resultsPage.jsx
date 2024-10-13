import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchResponsesWithProsCons } from '../../server/database/firebasefuncs'; // Import your new Firebase function

const ResultsPage = () => {
    const location = useLocation();
    const [reviewData, setReviewData] = useState(null); // Initialize state to hold review data
    const [prosConsData, setProsConsData] = useState(null); // Initialize state for pros/cons data
    const [selectedTagSentences, setSelectedTagSentences] = useState([]); // For storing sentences of the clicked tag
    const [selectedTagName, setSelectedTagName] = useState(''); // For storing tag name
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

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
            const { responses, prosConsData } = await fetchResponsesWithProsCons(major, number, professor); // Call Firebase function
            if (responses && prosConsData) {
                setReviewData({ responses }); // Set responses
                setProsConsData(prosConsData); // Set pros, cons, etc.
                console.log(prosConsData)
            }
        };
        fetchData();
    }, [professor, major, number]); // Re-run when these change

    // Show a loading state while data is being fetched
    if (!reviewData || !prosConsData) {
        return <div>Loading...</div>;
    }

    const handleOpen = (tagSentences, tagName) => {
        setSelectedTagSentences(tagSentences); // Set sentences based on the clicked tag
        setSelectedTagName(tagName); // Set the name of the tag clicked (e.g., "Challenging Syntax")
        setIsOpen(true); // Open the modal
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const ReviewSummary = ({ name, rating, summary, pros = [], neutral = [], cons = [] }) => {
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
    
                {/* Pros Section */}
                <div className="flex flex-column mb-4">
                    <div className="mr-5">Pros:</div>
                    <div className="flex flex-wrap">
                        {pros.length > 0 ? (
                            pros.map((pro, index) => (
                                <button
                                    key={index}
                                    className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                    onClick={() => handleOpen(pro.sentences, pro.tag)} // Pass sentences and tag to handleOpen
                                >
                                    {pro.tag}
                                </button>
                            ))
                        ) : (
                            <div>No pros available</div>
                        )}
                    </div>
                </div>
    
                {/* Neutral Section */}
                <div className="flex flex-column mb-4">
                    <div className="mr-5">Neutral:</div>
                    <div className="flex flex-wrap">
                        {neutral.length > 0 ? (
                            neutral.map((neutralItem, index) => (
                                <button
                                    key={index}
                                    className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                    onClick={() => handleOpen(neutralItem.sentences, neutralItem.tag)} // Pass sentences and tag
                                >
                                    {neutralItem.tag}
                                </button>
                            ))
                        ) : (
                            <div>No neutral aspects available</div>
                        )}
                    </div>
                </div>
    
                {/* Cons Section */}
                <div className="flex flex-column mb-4">
                    <div className="mr-5">Cons:</div>
                    <div className="flex flex-wrap">
                        {cons.length > 0 ? (
                            cons.map((con, index) => (
                                <button
                                    key={index}
                                    className="bg-[#f172ac] text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-[#fbbee6]"
                                    onClick={() => handleOpen(con.sentences, con.tag)} // Pass sentences and tag
                                >
                                    {con.tag}
                                </button>
                            ))
                        ) : (
                            <div>No cons available</div>
                        )}
                    </div>
                </div>
    
                <button 
                    className="bg-[#f172ac] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#fbbee6] transition mt-3"
                    onClick={navigateBackToSearch}>
                        Back to Search
                </button>
            </div>
        );
    };

    const Modal = ({ isOpen, onClose, content, attribute }) => {
        if (!isOpen) return null; // Do not render if not open
    
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
                    <h2 className="text-xl font-semibold mb-4">{attribute}</h2>
                    <h3 className="text-l font-semibold mb-4">Here's what students have to say about this: </h3>
                    <ul className="mb-4">
                        {content.map((item, index) => (
                            <li key={index} className="mb-2">
                                "{item}"
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-4 bg-[#f172ac] text-white rounded px-4 hover:bg-[#fbbee6]"
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
                name={professor.replace(/_/g, ' ')} 
                rating={prosConsData.rating} 
                summary={prosConsData.summary} 
                pros={prosConsData.pros} 
                neutral={prosConsData.neutral} 
                cons={prosConsData.cons} 
            />
            <Modal 
                isOpen={isOpen} 
                onClose={handleClose} 
                content={selectedTagSentences} // Sentences for the clicked tag
                attribute={selectedTagName} // Display the name of the clicked tag
            />
        </div>
    );
}

export default ResultsPage;
