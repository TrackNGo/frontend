import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LostItemReport.css'; // Import the CSS for styling

function LostItemReport() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dateTime: '',
        busRoute: '',
        busNumber: '',
        description: '',
        contactDetails: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data here (you can send it to an API)
        console.log(formData);
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="lost-item-container">
            <h1 className="page-title">Lost Item</h1>
            <h2 className="page-subtitle">Report Lost Item</h2>
            <form onSubmit={handleSubmit} className="lost-item-form">
                <div className="form-group">
                    <label htmlFor="name">Contact Information (Enter Your Name):</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime">Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                          placeholder="MM/DD/YYYY HH:MM AM/PM"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="busRoute">Bus Route:</label>
                    <input
                        type="text"
                        id="busRoute"
                        name="busRoute"
                        value={formData.busRoute}
                        onChange={handleChange}
                        placeholder="Enter bus route number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="busNumber">Bus Number:</label>
                    <input
                        type="text"
                        id="busNumber"
                        name="busNumber"
                        value={formData.busNumber}
                        onChange={handleChange}
                        placeholder="Enter bus number:xx-xxxx"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description (Item color, size, markings):</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide a description of the lost item"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactDetails">Contact Details:</label>
                    <input
                        type="text"
                        id="contactDetails"
                        name="contactDetails"
                        value={formData.contactDetails}
                        onChange={handleChange}
                        placeholder="Enter your contact details"
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="home-button" onClick={goHome}>Go to Home Page</button>
                </div>
            </form>
        </div>
    );
}

export default LostItemReport;
