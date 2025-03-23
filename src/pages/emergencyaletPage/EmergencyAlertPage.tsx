import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmergencyAlertPage = () => {
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  const emergencyTypes = [
    { id: 1, name: "Mechanical Failure", icon: "🚗💥" },
    { id: 2, name: "Medical Emergency", icon: "🚑" },
    { id: 3, name: "Accident", icon: "⚠️" },
    { id: 4, name: "Route Blocked", icon: "🚧" },
    { id: 5, name: "Security Issue", icon: "👮♂️" },
    { id: 6, name: "Other Emergency", icon: "🆘" },
  ];

  const handleEmergencySubmit = async (emergencyType: string) => {
    try {
      await axiosInstance.post("/api/emergency", {
        type: emergencyType,
        busNumber: "CAV-1177", // Replace with dynamic bus number
        timestamp: new Date().toISOString(),
      });
      alert("Emergency reported successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error reporting emergency:", error);
      alert("Failed to report emergency. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Report Emergency</h1>
        
        <div className="grid grid-cols-1 gap-4">
          {emergencyTypes.map((emergency) => (
            <button
              key={emergency.id}
              onClick={() => handleEmergencySubmit(emergency.name)}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all
                         flex items-center justify-start space-x-4 text-left"
            >
              <span className="text-2xl">{emergency.icon}</span>
              <span className="text-gray-700 font-medium">{emergency.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-xl
                     text-gray-600 font-medium transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmergencyAlertPage;