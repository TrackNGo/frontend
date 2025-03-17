import axios from "axios";
import { useState } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API URL
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
      const response = await axiosInstance.post("/api/report", {
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
    <div className="px-2">
      <h2 className="text-xl font-semibold">Submit a Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label className="block">Bus ID:</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setbusNumber(e.target.value)}
            className="p-2 w-full border-2 border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-2">
          <label className="block">Issue Type:</label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="p-2 w-full border-2 border-gray-300 rounded"
            required
          >
            <option value="">Select an issue type</option>
            <option value="Driver Behavior">Driver Behavior</option>
            <option value="Speed Issue">Speed Issue</option>
            <option value="Conductor Behavior">Conductor Behavior</option>
            <option value="Bus Condition">Bus Condition</option>
            <option value="Route Issue">Route Issue</option>
            <option value="Bus Fee Issue">Bus Fee Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mt-2">
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 w-full border-2 border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-2">
          <label className="block">Contact Details (optional):</label>
          <input
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            className="p-2 w-full border-2 border-gray-300 rounded"
          />
        </div>

        <div className="mt-2">
          <PrimaryBtn
            type="submit"
            title="Submit Report"
            classes="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-700 hover:to-blue-800 border-solid border-1 border-slate-900 text-white"
          />
        </div>
      </form>
      {message && (
        <div className="mt-2">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
