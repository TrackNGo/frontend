import React, { useState, useEffect, ChangeEvent } from 'react';
import './SearchItem.css'; // Add your custom CSS file for styling

// Define the shape of the item data
interface Item {
    _id: string;
    busRoute: string;
    busNumber: string;
    description: string;
    contactDetails: string;
    dateTime: string;  // Assuming dateTime is a string in ISO format
}

const SearchItem: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Item[]>([]);
    const [itemType, setItemType] = useState<'lost' | 'found'>('lost'); // Item type, either 'lost' or 'found'
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<'all' | '1day' | '1week' | 'moreThanWeek'>('all'); // Filter state

    // Handle search input change
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };

    // Calculate the difference between the current date and the item's date
    const getDateDifference = (itemDate: string): string => {
        const currentDate = new Date();
        const itemDateTime = new Date(itemDate);
        const diffTime = currentDate.getTime() - itemDateTime.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24); // Convert time difference to days

        if (diffDays <= 1) return '1day';
        if (diffDays <= 7) return '1week';
        return 'moreThanWeek';
    };

    // Fetch items based on itemType, search query, and selected filter
    const fetchItems = (): void => {
        setLoading(true);
        fetch(`http://localhost:5000/api/items/${itemType}?route=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                // Apply the filter after fetching items
                const filteredItems = data.filter((item: Item) => {
                    const dateDifference = getDateDifference(item.dateTime);
                    if (filter === 'all') return true;
                    return dateDifference === filter;
                });
                setItems(filteredItems);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                setLoading(false);
            });
    };

    // Handle search button click
    const handleSearchClick = (): void => {
        fetchItems();
    };

    // Handle Lost/Found item type selection
    const handleItemTypeChange = (type: 'lost' | 'found'): void => {
        setItemType(type);
        fetchItems();  // Fetch items immediately after switching item type
    };

    // Handle filter change
    const handleFilterChange = (newFilter: 'all' | '1day' | '1week' | 'moreThanWeek'): void => {
        setFilter(newFilter);
    };

    useEffect(() => {
        if (searchQuery || filter !== 'all') {
            fetchItems();  // Fetch items on searchQuery or filter change
        }
    }, [searchQuery, filter]);

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

            <div className="filter-buttons">
                <button
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                >
                    All Items
                </button>
                <button
                    className={`filter-button ${filter === '1day' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('1day')}
                >
                    Lost 1 Day Ago
                </button>
                <button
                    className={`filter-button ${filter === '1week' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('1week')}
                >
                    Lost 1 Week Ago
                </button>
                <button
                    className={`filter-button ${filter === 'moreThanWeek' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('moreThanWeek')}
                >
                    Lost More Than 1 Week Ago
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
                                <p><strong>Item id:</strong> {item._id}</p>
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
};

export default SearchItem;
