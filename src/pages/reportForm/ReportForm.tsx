import axios from "axios";
import { useState } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});


const ReportForm = () => {
  const [busId, setBusId] = useState<string>("");
  const [issueType, setIssueType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contactDetails, setContactDetails] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!busId || !issueType || !description) {
      setMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/report", {
        busId,
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
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
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