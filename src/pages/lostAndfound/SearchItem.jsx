import React, { useState, useEffect } from 'react';
import './SearchItem.css'; // Add your custom CSS file for styling

function SearchItem() {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([]);
    const [itemType, setItemType] = useState('lost'); // Default to 'lost'
    const [loading, setLoading] = useState(false);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Fetch items based on itemType and search query
    const fetchItems = () => {
        setLoading(true);
        fetch(`http://localhost:5000/api/items/${itemType}?route=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                setLoading(false);
            });
    };

    // Handle search button click
    const handleSearchClick = () => {
        fetchItems();
    };

    // Handle Lost/Found item type selection
    const handleItemTypeChange = (type) => {
        setItemType(type);
        fetchItems();  // Fetch items immediately after switching item type
    };

    useEffect(() => {
        if (searchQuery) {
            fetchItems();  // Fetch items on searchQuery change
        }
    }, [searchQuery]);

    return (
        <div className="search-item-container">
            <h1>Search Lost and Found Items</h1>
            <div className="search-controls">
                <input
                    type="text"
                    placeholder="Search by Route"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={handleSearchClick} className="search-button">Search</button>
            </div>

            <div className="item-type-buttons">
                <button
                    className={`item-type-button ${itemType === 'lost' ? 'active' : ''}`}
                    onClick={() => handleItemTypeChange('lost')}
                >
                    Lost Items
                </button>
                <button
                    className={`item-type-button ${itemType === 'found' ? 'active' : ''}`}
                    onClick={() => handleItemTypeChange('found')}
                >
                    Found Items
                </button>
            </div>

            <div className="items-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    items.length > 0 ? (
                        items.map(item => (
                            <div key={item._id} className="item-card">
                                <h3>{item.busRoute} - {item.busNumber}</h3>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Contact:</strong> {item.contactDetails}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items found for the selected route and type.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default SearchItem;
