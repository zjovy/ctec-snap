import React from 'react';

const ReviewSummary = ({ name, rating, summary, tags }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg h-full w-screen p-10">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
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
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-blue-600"
                        onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-blue-600"
                        onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-blue-600"
                        onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewSummary;