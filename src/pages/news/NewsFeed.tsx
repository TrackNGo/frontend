import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api-news";

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
        <div className="p-4">
            <h2 className="text-xl font-bold">Latest Bus Transport News</h2>
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
                <ul>
                    {newsList.map(news => (
                        <li key={news._id} className="border p-3 my-2 rounded shadow">
                            <h3 className="text-lg font-semibold">{news.title}</h3>
                            <p>{news.description}</p>
                            <small>Source: {news.source} | {new Date(news.publishedDate).toLocaleDateString()}</small>
                            <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2">
                                Read More
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NewsFeed;
