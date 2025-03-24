import { useState } from "react";
import axios from "axios";

type FormType = "busService" | "technical";

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
  const [activeTab, setActiveTab] = useState<FormType>("busService");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [busServiceForm, setBusServiceForm] = useState<BusServiceForm>({
    busNumber: "",
    ownerName: "",
    ownerContact: "",
    registrationNumber: "",
    routeDetails: "",
  });

  const [technicalForm, setTechnicalForm] = useState<TechnicalForm>({
    name: "",
    email: "",
    issueType: "",
    description: "",
  });

  const resetForms = () => {
    setBusServiceForm({
      busNumber: "",
      ownerName: "",
      ownerContact: "",
      registrationNumber: "",
      routeDetails: "",
    });
    setTechnicalForm({
      name: "",
      email: "",
      issueType: "",
      description: "",
    });
  };

  const handleSubmit = async (
    e: React.FormEvent,
    formData: BusServiceForm | TechnicalForm,
    endpoint: string
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await axios.post(`/api/contact/${endpoint}`, formData);
      setSubmissionStatus({
        success: true,
        message: response.data.message || "Submission successful!",
      });
      resetForms();
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Submission failed. Please try again.";
      setSubmissionStatus({
        success: false,
        message: errorMessage,
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
              className={`flex-1 py-2 px-1 text-center font-medium text-sm ${
                activeTab === "busService"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("busService")}
            >
              Add Bus Service
            </button>
            <button
              className={`flex-1 py-2 px-1 text-center font-medium text-sm ${
                activeTab === "technical"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("technical")}
            >
              Technical Support
            </button>
          </div>

          {/* Status Message */}
          {submissionStatus && (
            <div
              className={`mb-6 p-3 rounded-md ${
                submissionStatus.success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {submissionStatus.message}
            </div>
          )}

          {/* Bus Service Form */}
          {activeTab === "busService" && (
            <form
              onSubmit={(e) => handleSubmit(e, busServiceForm, "bus-service")}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Number*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={busServiceForm.busNumber}
                  onChange={(e) =>
                    setBusServiceForm({
                      ...busServiceForm,
                      busNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={busServiceForm.ownerName}
                  onChange={(e) =>
                    setBusServiceForm({
                      ...busServiceForm,
                      ownerName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={busServiceForm.ownerContact}
                  onChange={(e) =>
                    setBusServiceForm({
                      ...busServiceForm,
                      ownerContact: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={busServiceForm.registrationNumber}
                  onChange={(e) =>
                    setBusServiceForm({
                      ...busServiceForm,
                      registrationNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Route Details*
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={busServiceForm.routeDetails}
                  onChange={(e) =>
                    setBusServiceForm({
                      ...busServiceForm,
                      routeDetails: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}

          {/* Technical Support Form */}
          {activeTab === "technical" && (
            <form
              onSubmit={(e) => handleSubmit(e, technicalForm, "technical")}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={technicalForm.name}
                  onChange={(e) =>
                    setTechnicalForm({ ...technicalForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={technicalForm.email}
                  onChange={(e) =>
                    setTechnicalForm({
                      ...technicalForm,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type*
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={technicalForm.issueType}
                  onChange={(e) =>
                    setTechnicalForm({
                      ...technicalForm,
                      issueType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select an issue type</option>
                  <option value="login">Login Problems</option>
                  <option value="performance">Performance Issues</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={technicalForm.description}
                  onChange={(e) =>
                    setTechnicalForm({
                      ...technicalForm,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
