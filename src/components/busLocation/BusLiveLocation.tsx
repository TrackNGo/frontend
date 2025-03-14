import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusIcon from '../mapIcon/BusIcon';
import BusLocationType from '../../types/location/BusLocationType';
import axios from 'axios';

interface BusLiveLocationProps {
    busNumber: string; // Bus ID passed as a prop
}

interface LocationCoords {
    lat: number
    lng: number
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",//172.16.193.135
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
});

const BusLiveLocation: React.FC<BusLiveLocationProps> = ({ busNumber }) => {

    const [busDetails, setBuses] = useState<BusLocationType | null>(null);
    const [first, setFirst] = useState<LocationCoords>({lat:0,lng:0})
    const [second, setSecond] = useState<LocationCoords>({lat:0,lng:0})
    const [speed, setSpeed] = useState<number>(0)

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
                // console.log(data)
                setBuses(data)
            } catch (error) {
                console.error('Error fetching bus locations:', error)
            }
        }

        const intervalId = setInterval(fetchBusLocations, 10000); // Update every 10 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [busNumber]);

    useEffect(() => {

        async function calculateBusSpeed(busDetails:any) {
            
            const setData = { nLat: busDetails.latitude, nLng: busDetails.longitude };
            
            setFirst(second);
            setSecond( {lat:setData.nLat, lng: setData.nLng} )
    
            if(first.lat != 0 && first.lng != 0 && second.lat != 0 && second.lng != 0) {

                // console.log('check')
                const checkData = await axiosInstance.post<{
                    distance:number,
                    duration:number
                }>(`/api-location/get-location-distance`, {
                    first,
                    second
                });
                
                const { distance, duration } = checkData.data;

                const distanceInKilometers:number = (distance / 1000);// Calculate the distance in km

                const timeInHours:number = duration / 3600;// Calculate the time in h

                const busSpeed:number = distanceInKilometers / timeInHours;// Calculate the speed in kmph - i think
                console.log(busSpeed)
                setSpeed(busSpeed)
                setFirst( {lat:0, lng: 0} );
                setSecond( {lat:0, lng: 0} );

            }
        }

        if (busDetails) {
            calculateBusSpeed(busDetails)
        }

      }, [busDetails]);

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
                    Last Updated: {new Date(busDetails.lastUpdated).toLocaleString()}<br/>
                    {
                        speed ? (<>Speed : {speed} Kmph</>) : (<>Speed : ... Kmph</>)
                    }
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
