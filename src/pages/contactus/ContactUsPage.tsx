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
