import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './LostItemReport.css'; // Import the CSS for styling

// Define the shape of form data
interface FormData {
    name: string;
    dateTime: string;
    busRoute: string;
    busNumber: string;
    description: string;
    contactDetails: string;
}

const LostItemReport: React.FC = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState<FormData>({
        name: '',
        dateTime: '',
        busRoute: '',
        busNumber: '',
        description: '',
        contactDetails: '',
    });

    // Handle form field changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        // Send data to the backend (POST request)           //backend problem could happen
        fetch('http://localhost:5000/api/items/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'lost',
                userName: formData.name,
                dateTime: formData.dateTime,
                busRoute: formData.busRoute,
                busNumber: formData.busNumber,
                description: formData.description,
                contactDetails: formData.contactDetails,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item submitted:', data);
                alert('Lost item report submitted successfully!');
                navigate('/'); // Redirect to home page after submission
            })
            .catch((error) => {
                console.error('Error submitting item:', error);
                alert('There was an error submitting the report.');
            });
    };

    // Navigate to home
    const goHome = (): void => {
        navigate('/lnshome');
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
                    <button type="button" className="home-button" onClick={goHome}>
                        Go to Home Page
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LostItemReport;
