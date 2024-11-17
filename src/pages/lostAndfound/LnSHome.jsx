import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LnSHome.css'; // Import the external CSS file

function LnSHome() {
    const navigate = useNavigate();

    // Navigate to different pages when buttons are clicked
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Lost and Found System</h1>
            <div className="home-button-container">
                <button className="home-button" onClick={() => handleNavigation('/SearchItem')}>
                    Search Lost Item
                </button>
                <button className="home-button" onClick={() => handleNavigation('/LostItemReport')}>
                    Report Lost Item
                </button>
                <button className="home-button" onClick={() => handleNavigation('/FoundItemReport')}>
                    Report Found Item
                </button>
            </div>
        </div>
    );
}

export default LnSHome;
