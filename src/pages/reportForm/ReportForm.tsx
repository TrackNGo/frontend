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