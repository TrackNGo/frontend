import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoundItemReport.css'; // Import the CSS for styling

// Define the shape of form data
interface FormData {
    name: string;
    dateTime: string;
    busRoute: string;
    busNumber: string;
    description: string;
    contactDetails: string;
}

const FoundItemReport: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        dateTime: '',
        busRoute: '',
        busNumber: '',
        description: '',
        contactDetails: '',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    // Handle form field changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        });
    };

    // Validate form data
    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            alert('Name is required.');
            return false;
        }
        if (!formData.dateTime) {
            alert('Date and time are required.');
            return false;
        }
        if (!formData.description.trim()) {
            alert('Description is required.');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent): void => {

        
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true); // Show loading state

        // Send data to the backend (POST request)
        fetch('http://localhost:8080/api/items/submit', {      
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                 //backend problem could happen
            },
            body: JSON.stringify({
                type: 'found', // Type is "found" for this form
                userName: formData.name,
                dateTime: formData.dateTime, // Convert to a Date object,
                busRoute: formData.busRoute,
                busNumber: formData.busNumber,
                description: formData.description,
                contactDetails: formData.contactDetails,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item submitted:', data);
                alert('Found item report submitted successfully!');
                navigate('/lnshome'); // Redirect to home page after submission
            })
            .catch((error) => {
                console.error('Error submitting item:', error);
                alert('There was an error submitting the report.');
            })
            .finally(() => {
                setIsLoading(false); // Hide loading state
            });
    };

    // Navigate to the home page
    const goHome = (): void => {
        navigate('/lnshome');
    };

    return (
        <div className="found-item-container">
            <h1 className="page-title">Found Item</h1>
            <h2 className="page-subtitle">Report Found Item</h2>
            <form onSubmit={handleSubmit} className="found-item-form">
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
                        placeholder="Enter bus route"
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
                        placeholder="Enter bus number"
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
                        placeholder="Provide a description of the found item"
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
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" className="home-button" onClick={goHome}>
                        Go to Home Page
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoundItemReport;
