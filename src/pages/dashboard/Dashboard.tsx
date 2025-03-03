import axios from "axios";
import { useEffect, useState, useRef } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
// import { useState, useRef } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const Dashboard = () => {
  const [busStatus, setBusStatus] = useState<boolean>(false); // Tracks if the bus is active
  const watchIdRef = useRef<number | null>(null); // Tracks the geolocation watcher ID
  const busNumber = "CAV-1177";

  useEffect(() => {
    // Fetch the current bus status from the backend
    const fetchBusStatus = async () => {
      try {
        const response = await axiosInstance.get(`/api-location/get-bus-status/${busNumber}`);
        if (response.status === 200 && response.data?.status !== undefined) {
          const status = response.data.status;
          setBusStatus(status);
          console.log(status)

          // Start tracking if the bus is active
          if (status) {
            startTracking();
          }
        }
      } catch (error) {
        console.error("Error fetching bus status:", error);
      }
    };

    fetchBusStatus()

  }, []);

  // Function to start location tracking
  const startTracking = async () => {
    try {
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log(`lat: ${latitude}, lon: ${longitude}, acc: ${accuracy}`);

            try {
              const response = await fetch(
                "http://localhost:8080/api-location/update-location",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    busNumber,
                    latitude,
                    longitude,
                    accuracy,
                  }),
                }
              );

              if (!response.ok) {
                console.error("Failed to update location");
              }
            } catch (error) {
              console.error("Error updating location:", error);
            }
          },
          (error) => console.error("Error obtaining location:", error),
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error starting tracking:", error);
    }
  };

  // Function to stop location tracking
  const stopTracking = () => {
    console.log(watchIdRef)
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      console.log("Stopped location tracking.");
    }
  };

  // Function to update bus status and handle start/stop tracking
  const handleBusStatusChange = async (status: boolean) => {
    try {
      const response = await axiosInstance.put("/api-location/update-bus-status", {
        busNumber,
        setStatus: status,
      });

      if (response.status === 200) {
        alert(`Bus running mode - ${status ? "ON" : "OFF"}`);
        setBusStatus(status);

        if (status) {
          startTracking(); // Start tracking when status is true
        } else {
          stopTracking(); // Stop tracking when status is false
        }
      } else {
        console.error("Failed to update bus status in backend");
      }
    } catch (error) {
      console.error("Error updating bus status:", error);
    }
  };

  return (
    <>
      {
        busStatus ? (
          <div className="px-2">
            <div className="mt-2">
              <PrimaryBtn
                type="button"
                title="Start"
                onClick={() => handleBusStatusChange(true)} // Set status to true and start tracking
                classes="bg-gradient-to-r from-green-500 to-green-500 hover:from-green-700 hover:to-green-800 border-solid border-1 border-slate-900 text-white"
              />
            </div>
            <div className="mt-2">
              <PrimaryBtn
                type="button"
                title="End"
                onClick={() => handleBusStatusChange(false)} // Set status to false and stop tracking
                classes="bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"
              />
            </div>
            <div className="mt-2">
              <PrimaryBtn
                type={"button"}
                title={"Alert"}
                classes={"bg-gradient-to-r from-red-500 to-red-500 hover:from-red-800 hover:to-red-700 border-solid border-1 border-slate-900 text-white"}
              />
            </div>
          </div>
        ) : (
          <div className="px-2">
            <div className="mt-2">
              <PrimaryBtn
                type="button"
                title="Start"
                onClick={() => handleBusStatusChange(true)} // Set status to true and start tracking
                classes="bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"
              />
            </div>
            <div className="mt-2">
              <PrimaryBtn
                type="button"
                title="End"
                onClick={() => handleBusStatusChange(false)} // Set status to false and stop tracking
                classes="bg-gradient-to-r from-green-500 to-green-500 hover:from-green-700 hover:to-green-800 border-solid border-1 border-slate-900 text-white"
              />
            </div>
            <div className="mt-2">
              <PrimaryBtn
                type={"button"}
                title={"Alert"}
                classes={"bg-gradient-to-r from-red-500 to-red-500 hover:from-red-800 hover:to-red-700 border-solid border-1 border-slate-900 text-white"}
              />
            </div>
          </div>
        )
      }


    </>
  );
};

export default Dashboard;

