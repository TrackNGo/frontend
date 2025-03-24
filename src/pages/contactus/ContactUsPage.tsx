import { useState } from 'react';
import axios from 'axios';

type FormType = 'busService' | 'technical';

interface SubmissionStatus {
    success: boolean;
    message: string;
}

interface BusServiceForm {
    busNumber: string;
    ownerName: string;
    ownerContact: string;
    registrationNumber: string;
    routeDetails: string;
}

interface TechnicalForm {
    name: string;
    email: string;
    issueType: string;
    description: string;
}

const ContactUsPage = () => {
    const [activeTab, setActiveTab] = useState<FormType>('busService');
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [busServiceForm, setBusServiceForm] = useState<BusServiceForm>({
        busNumber: '',
        ownerName: '',
        ownerContact: '',
        registrationNumber: '',
        routeDetails: ''
    });

    const [technicalForm, setTechnicalForm] = useState<TechnicalForm>({
        name: '',
        email: '',
        issueType: '',
        description: ''
    });

    const resetForms = () => {
        setBusServiceForm({
            busNumber: '',
            ownerName: '',
            ownerContact: '',
            registrationNumber: '',
            routeDetails: ''
        });
        setTechnicalForm({
            name: '',
            email: '',
            issueType: '',
            description: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent, formData: BusServiceForm | TechnicalForm, endpoint: string) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            const response = await axios.post(`/api/contact/${endpoint}`, formData);
            setSubmissionStatus({
                success: true,
                message: response.data.message || 'Submission successful!'
            });
            resetForms();
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Submission failed. Please try again.';
            setSubmissionStatus({
                success: false,
                message: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>
                            <p className="text-gray-600 mt-2">How can we help you today?</p>
                        </div>
    
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                className={`flex-1 py-2 px-1 text-center font-medium text-sm ${activeTab === 'busService' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('busService')}
                            >
                                Add Bus Service
                            </button>
                            <button
                                className={`flex-1 py-2 px-1 text-center font-medium text-sm ${activeTab === 'technical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('technical')}
                            >
                                Technical Support
                            </button>
                        </div>
    
                        {/* Status Message */}
                        {submissionStatus && (
                            <div className={`mb-6 p-3 rounded-md ${submissionStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {submissionStatus.message}
                            </div>
                        )}