import { useNavigate, useParams } from "react-router-dom"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import { useEffect, useState } from "react"
import BusRouteTypes from "../../types/busRoute/BusRouteTypes"
import axios from "axios"
import RouteStopList from "../../components/routeStopList/RouteStopList"
import LocationInfo from "../../components/locationInfo/LocationInfo"
import BusStatus from "../../components/busStatus/BusStatus"

const BusTrackingDetails = () => {
    const { busNumber } = useParams<string>()
    const [loading, setLoading] = useState(true)
    const [busRouteDetails, setBusRouteDetails] = useState<BusRouteTypes | null>(null)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const fetchDetails = async () => {
        try {
            const routeResponse = await axios.get(`http://localhost:3000/api-busroutes/busRoute/${busNumber}`)
            const busResponse = await axios.get(`http://localhost:3000/api-bus/bus/${busNumber}`)

            const busData = busResponse.data
            const routeData = routeResponse.data
            
            //console.log(routeData)

            setBusRouteDetails({
                ...routeData,
                status: busData.status
            })
            //console.log(busData?.status)
            //console.log(busRouteDetails?.busNumber)
            //console.log(busRouteDetails?.status)
            setError(null)  // Reset error state if the data is fetched successfully
        } catch (error: any) {
            if (error.response?.status === 404) {
                setError("Bus details not found.")
            } else {
                setError("Error fetching bus details.")
            }
            setBusRouteDetails(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (busNumber) {
            fetchDetails()
        }
    }, [busNumber])

    if (loading) return <p>Loading...</p>
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

            <div>map</div>

            <div className="mt-2">
                <BusStatus status={busRouteDetails?.status} />
            </div>

            <LocationInfo title="starting point" location={busRouteDetails?.startLocation || "N/A"} />
            <LocationInfo title="ending point" location={busRouteDetails?.endLocation || "N/A"} />

            <RouteStopList stops={busRouteDetails?.routeStops || []}/>

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

export default BusTrackingDetails
