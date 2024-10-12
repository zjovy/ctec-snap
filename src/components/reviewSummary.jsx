import React from 'react';

const ReviewSummary = ({ name, rating, summary, tags }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg h-full w-screen p-10">
            <h2 className="text-3xl font-semibold text-[#646b96]">{name}</h2>
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
                            onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
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
                            onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
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
                            onClick={() => alert(`More information about: ${tag}`)} // Replace with your logic
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewSummary;