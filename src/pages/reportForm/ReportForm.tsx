import axios from "axios";
import { useState } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
import baseUrl from "../../common/baseBackendUrl";

const axiosInstance = axios.create({
  baseURL: `${baseUrl.customerBackend}api-report`, // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const ReportForm = () => {
  const [busNumber, setbusNumber] = useState<string>("");
  const [issueType, setIssueType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contactDetails, setContactDetails] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!busNumber || !issueType || !description) {
      setMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axiosInstance.post("/report", {
        busNumber,
        issueType,
        description,
        contactDetails,
      });

      if (response.status === 201) {
        setMessage("Report submitted successfully.");
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Submit Report</h2>
          <p className="text-gray-500 mt-2">Help us Public Transport</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus ID
            </label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setbusNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ3NDc1NyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right:1rem_center] bg-[length:1.5em]"
              required
            >
              <option value="">Select issue type</option>
              <option value="Driver Behavior">Driver Behavior</option>
              <option value="Speed Issue">Speed Issue</option>
              <option value="Conductor Behavior">Conductor Behavior</option>
              <option value="Bus Condition">Bus Condition</option>
              <option value="Route Issue">Route Issue</option>
              <option value="Bus Fee Issue">Bus Fee Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all min-h-[120px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Details <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
              placeholder="Email or phone number"
            />
          </div>

          <div className="pt-4">
            <PrimaryBtn
              type="submit"
              title="Submit Report"
              classes="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes("success")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
              }`}>
              {message}
            </div>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default ReportForm;
