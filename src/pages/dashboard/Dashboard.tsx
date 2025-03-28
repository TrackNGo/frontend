import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../common/baseBackendUrl";
import { useAuth } from "../../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: baseUrl.customerBackend,
  headers: { "X-Custom-Header": "foobar" },
});

const Dashboard = () => {
  const { logout } = useAuth()
  const { busNumber } = useParams<{ busNumber: string }>()
  
  const navigate = useNavigate();
  const [busStatus, setBusStatus] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString()
  );
  const watchIdRef = useRef<number | null>(null);
  const [conductorName, setConductorName] = useState<string>()
  const [routeLocation, setRouteLocation] = useState({
    start:'',
    end:''
  })
  const [allAlert, setAllAlert] = useState([]);

  useEffect(() => {
    const fetchBusStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `/api-location/get-bus-status/${busNumber}`
        );

        if (response.status === 200) {
          const status = response.data.status;
          setRouteLocation({
            start : response.data.startLocation,
            end : response.data.endLocation
          })
          setBusStatus(status);
          if (status) startTracking();
        }
      } catch (error) {
        console.error("Error fetching bus status:", error);
      }
    };

    const fetchBusConductorDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl.adminBackend}api-user/user-by-busnumber/${busNumber}`);
        
        if (response.status === 200) {
          setAllAlert(response.data.user.username)
        }
      } catch (error) {
        console.error("Error fetching bus status:", error);
      }
    };

    const showTodayAlert = async () => {
      try {
        const response = await axios.get(`${baseUrl.customerBackend}api-emergency/${busNumber}`);
        
        if (response.status === 200) {
          console.log(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching bus status:", error);
      }
    };

    fetchBusStatus();
    fetchBusConductorDetails();
    const intervalId = setInterval(showTodayAlert, 5000);
    return () => clearInterval(intervalId);
    showTodayAlert();
  }, []);

  const startTracking = async () => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          try {
            await axiosInstance.put("/api-location/update-location", {
              busNumber: busNumber,
              latitude,
              longitude,
              accuracy,
            });
            setLastUpdated(new Date().toLocaleTimeString());
          } catch (error) {
            console.error("Error updating location:", error);
          }
        },
        (error) => console.error("Error obtaining location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const handleBusStatusChange = async (status: boolean) => {
    try {
      const response = await axiosInstance.put(
        "/api-location/update-bus-status",
        {
          busNumber: busNumber,
          setStatus: status,
        }
      );

      if (response.status === 200) {
        setBusStatus(status);
        if (status) {
          startTracking();
        } else {
          stopTracking();
        }
      }
    } catch (error) {
      console.error("Error updating bus status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Bus Information Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {busNumber}
            </h1>
          </div>
          <div
            className={`px-3 py-1 rounded-full ${
              busStatus
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {busStatus ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Conductor:</span>
            <span className="font-medium">{conductorName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">From :</span>
            <span className="font-medium">
              {routeLocation.start}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">To :</span>
            <span className="font-medium">
              {routeLocation.end}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Last Updated:</span>
            <span className="font-medium">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleBusStatusChange(true)}
            className={`p-4 rounded-xl text-white font-medium transition-all ${
              busStatus
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 active:scale-95"
            }`}
            disabled={busStatus}
          >
            Start Route
          </button>

          <button
            onClick={() => handleBusStatusChange(false)}
            className={`p-4 rounded-xl text-white font-medium transition-all ${
              !busStatus
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 active:scale-95"
            }`}
            disabled={!busStatus}
          >
            End Route
          </button>
        </div>

        {/* Emergency Alert */}
        <button
          className="w-full p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl 
            font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          onClick={() => navigate(`/emergency/${busNumber}/${conductorName}`)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Emergency Alert
        </button>

        <button
          className="w-full p-4 bg-black hover:bg-yellow-600 text-white rounded-xl 
            font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          onClick={() => navigate(`/changepassword/${busNumber}/${conductorName}`)}
        >
          Change Password
        </button>

        <button
          className="w-full p-4 bg-black hover:bg-yellow-600 text-white rounded-xl 
            font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          onClick={() => {logout()}}
        >
          Logout
        </button>
      </div>

      {/* Status Indicator */}
      <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg">
        <div
          className={`w-3 h-3 rounded-full ${
            busStatus ? "bg-green-500" : "bg-gray-400"
          } animate-pulse`}
        />
      </div>
    </div>
  );
};

export default Dashboard;
