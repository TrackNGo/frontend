import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusIcon from '../mapIcon/BusIcon';
import BusLocationType from '../../types/location/BusLocationType';
import axios from 'axios';

interface BusLiveLocationProps {
    busNumber: string; // Bus ID passed as a prop
}

const BusLiveLocation: React.FC<BusLiveLocationProps> = ({ busNumber }) => {

    const [busDetails, setBuses] = useState<BusLocationType | null>(null);

    useEffect(() => {
        const fetchBusLocations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api-user/getBus-locations/${busNumber}`, {//172.16.193.135
                    headers: {
                        'Content-Type': 'application/json',
                        // 'ngrok-skip-browser-warning': 'true', // Uncomment if needed
                    },
                })
        
                const data = response.data
                console.log(data)
                setBuses(data)
            } catch (error) {
                console.error('Error fetching bus locations:', error)
            }
        }

        const intervalId = setInterval(fetchBusLocations, 10000); // Update every 10 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [busNumber]);

    return busDetails ? (
        <>
            {/* Marker with bus details */}
            <Marker
                key={busDetails.busNumber}
                position={[busDetails.latitude, busDetails.longitude]}
                icon={BusIcon}
            >
                <Popup>
                    Bus ID: {busDetails.busNumber} <br />
                    Last Updated: {new Date(busDetails.lastUpdated).toLocaleString()}
                </Popup>
            </Marker>
            {/* <MapZoomCenter position={[busDetails.latitude, busDetails.longitude]}/> */}
        </>
    ) : (
        <h1>Loading...</h1> // Loading state
    );
};

interface MapZoomCenterProps {
    position: [number, number]; // Latitude and longitude
}

const MapZoomCenter: React.FC<MapZoomCenterProps> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, 13); // Set the view to the position with zoom level 14
        }
    }, [position, map]);

    return null;
};

export default BusLiveLocation;
