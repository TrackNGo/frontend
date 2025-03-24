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