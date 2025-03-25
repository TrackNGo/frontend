import React, { useEffect, useState } from "react";
import axios from "axios";
import Headline from "../../components/headline/Headline";
import baseUrl from "../../common/baseBackendUrl";

const API_URL = `${baseUrl.customerBackend}api-news`;

interface News {
    _id: string;
    title: string;
    description: string;
    link: string;
    publishedDate: string;
    source: string;
}

const NewsFeed: React.FC = () => {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch latest news from the external API and store it in the database
            await axios.post(`${API_URL}/fetch-and-store-news`);

            // Fetch stored news from the database
            const response = await axios.get(`${API_URL}/get-stored-news`);
            setNewsList(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
            setError("Failed to load news. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-2">
            <Headline title="News Feed" />
            <div className="px-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={fetchNews}
                    disabled={loading}
                >
                    {loading ? "Loading" : "Refresh News"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {newsList.length === 0 ? (
                    <p>No news available</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsList.map(news => (
                            <li
                                key={news._id}
                                className="bg-white shadow-lg rounded-xl p-5 transition duration-300 hover:shadow-xl flex flex-col"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                                <p className="text-gray-600 mt-2 line-clamp-3">{news.description}</p>

                                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                                    <span>{news.source}</span>
                                    <span>{new Date(news.publishedDate).toLocaleDateString()}</span>
                                </div>

                                {/* This div takes up all available space to push the button to the bottom */}
                                <div className="flex-grow"></div>

                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center ring-1 ring-zinc-500 ring-inset transition-[background-color] text-white bg-zinc-800 hover:bg-zinc-600 active:bg-zinc-700 capitalize px-4 py-2 mt-4 rounded-lg font-medium duration-300"
                                >
                                    Read More
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NewsFeed;
