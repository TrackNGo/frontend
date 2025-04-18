import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import BusRouteTypes from "../../types/busRoute/BusRouteTypes"
import RouteStopList from "../../components/routeStopList/RouteStopList"
import LocationInfo from "../../components/locationInfo/LocationInfo"
import BusStatus from "../../components/busStatus/BusStatus"
import Map from "../../components/clientMap/Map"
import LocationType from "../../types/location/LocationType"
import RouteData from "../../types/location/RouteData"
import baseUrl from "../../common/baseBackendUrl"

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:8080",//172.16.193.135
//     timeout: 1000,
//     headers: { "X-Custom-Header": "foobar" },
// });

const BusTrackingDetails = () => {
    const { busNumber } = useParams<string>()
    const [loading, setLoading] = useState(true)
    const [busRouteDetails, setBusRouteDetails] = useState<BusRouteTypes | null>(null)
    // const [busDetails, setBusDetails] = useState<{ status: boolean } | null>(null)
    const [error, setError] = useState<string | null>(null)


    const [locations, setLocations] = useState<LocationType[]>([]); // Array of Location objects
    const [locationLoading, setLocationLoading] = useState<boolean>(false);
    // const [routeSegment, setRouteSegment] = useState<RouteSegment[]>([]); // Array of RouteSegment arrays
    const [drawRoute, setDrawRoute] = useState<RouteData[]>([])
    const [initialStatus, setStatus] = useState<boolean>(false)
    const [busRouteStop, setBusRouteStop] = useState<string[]>([])

    // const [error, setError] = useState<string>("");
    // const sourcePosition: [number, number] = [7.8731, 80.7718];

    const navigate = useNavigate()

    const fetchDetails = async () => {
        try {
            setLoading(true)
            //172.16.193.135
            const [routeResponse] = await Promise.all([
                // axios.get(`http://localhost:3000/api-busroutes/busRoute/${busNumber}`),
                axios.get(`${baseUrl.adminBackend}api-bus/bus/${busNumber}`)
            ])

            setBusRouteDetails(routeResponse.data)
            // setBusDetails(busResponse.data)
            setError(null) // Reset error state
        } catch (error: any) {
            setError("Error fetching bus details.")
            setBusRouteDetails(null)
            // setBusDetails(null)
        } finally {
            setLoading(false)
        }
    }

    const fetchRouteData = async (busNumber: string) => {

        try {
            setLocationLoading(true);

            // Fetch specific bus route
            const response = await axios.post<{
                specificBusRoute: BusRouteTypes
            }>(`${baseUrl.customerBackend}api-user/getSpecific-busRoute`,
                {
                    busNumber: busNumber,
                }
            );

            const { specificBusRoute } = response.data;

            setBusRouteDetails(specificBusRoute);
            setBusRouteStop(specificBusRoute.routeStops)

            // Prepare cities for geocoding
            const cities: string[] = [
                specificBusRoute.startLocation,
                ...specificBusRoute.routeStops,
                specificBusRoute.endLocation,
            ];

            const coordinates: LocationType[] = [];

            for (const city of cities) {
                const location = await geocodeCity(city);
                coordinates.push({ name: city, coordinates: [location.lat, location.lng] });
                // console.log(coordinates)
            }

            setLocations(coordinates);

            // Fetch segments
            const segments: RouteData[] = [];

            for (let i = 0; i < cities.length - 1; i++) {

                const startLocation = cities[i];
                const endLocation = cities[i + 1];

                const segmentResponse = await axios.post<{
                    sourceLocation: string;
                    destinationLocation: string;
                    route: string;
                }>(`${baseUrl.customerBackend}api-user/getLocationCode-searchByName`, {
                    startLocation,
                    endLocation,
                });

                const { sourceLocation, destinationLocation, route } = segmentResponse.data;
                segments.push({ sourceLocation, destinationLocation, route });
                // segments.push({ sourceLocation, destinationLocation, route });
                // console.log(segments)
            }
            // setRouteSegment(segments);
            setDrawRoute(segments)
            setLocationLoading(false);
        } catch (err) {
            console.error("Error fetching route data:", err);
            // setError("Failed to load route data.");
            setLocationLoading(false);
        }
    }

    const fetchBusStatus = async () => {
        try {
            const response = await axios.get(`${baseUrl.adminBackend}api-bus/bus/${busNumber}`, {//172.16.193.135
                headers: {
                    'Content-Type': 'application/json',
                    // 'ngrok-skip-browser-warning': 'true', // Uncomment if needed
                },
            })

            const data = response.data
            setStatus(data.status)
        } catch (error) {
            console.error('Error fetching bus locations:', error)
        }
    }

    useEffect(() => {
        if (busNumber) {
            fetchDetails()
            fetchRouteData(busNumber)
            const intervalId = setInterval(fetchBusStatus, 5000); // Update every 10 seconds
            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [busNumber])

    if (loading) return <p>Loading...</p>
    if (locationLoading) return <p>Location Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="px-2">
            <Headline title={`Bus Tracking - ${busNumber}`} />

            <div className="mt-3">
                <PrimaryBtn
                    title="refresh"
                    type="button"
                    onClick={fetchDetails}
                    classes="bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"
                />
            </div>

            <div>
                <Map locations={locations} drawRoute={drawRoute} trackBusNumber={busNumber} status={initialStatus} />
            </div>

            <div className="mt-2">
                <BusStatus status={initialStatus} />
            </div>

            <LocationInfo title="starting point" location={busRouteDetails?.startLocation || "N/A"} />
            <LocationInfo title="ending point" location={busRouteDetails?.endLocation || "N/A"} />
            
            <RouteStopList stops={busRouteStop} />

            <div className="py-4">
                <div className="sm:mb-1 mb-2">
                    <PrimaryBtn
                        title="cancel"
                        type="button"
                        onClick={() => { navigate(-1) }}
                        classes="bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"
                    />
                </div>
                <div className="sm:mt-1 mt-2">
                    <PrimaryBtn
                        title="go home"
                        type="button"
                        onClick={() => { navigate("/") }}
                        classes="bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"
                    />
                </div>
            </div>
        </div>
    )
}

const geocodeCity = async (city: string): Promise<any> => {
    interface Location {
        lat: number;
        lng: number;
    }
    const apiKey = "AIzaSyAiQ_WJER_3HDCs0B6tH01WPTCzB1COSLA";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching geocode data: ${response.statusText}`);
    }

    const data: {
        results: Array<{
            geometry: {
                location: Location;
            };
        }>;
    } = await response.json();

    // console.log(data);

    if (data.results && data.results.length > 0) {
        // console.log(data.results[0].geometry.location)
        return data.results[0].geometry.location;
    } else {
        throw new Error(`Coordinates not found for city: ${city}`);
    }
}

export default BusTrackingDetails
