import { useParams } from "react-router-dom"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import LocationPointBox from "../../components/locationPointBox/LocationPointBox"
import { useEffect, useState } from "react"
import BusRouteTypes from "../../types/busRoute/BusRouteTypes"

const mockBusData: { [key: string]: BusRouteTypes } = {
    "ND-4588": {
        busNumber: "ND-4588",
        routeNumber: "1",
        startLocation: "Colombo",
        endLocation: "Jaffna",
        routeStops: [
            "Colombo",
            "Kurunegala",
            "Anuradhapura",
            "Vavuniya",
            "Jaffna"
        ],
        status: true,
    },

    "ND-1234": {
        busNumber: "ND-1234",
        routeNumber: "2",
        startLocation: "Galle",
        endLocation: "Colombo",
        routeStops: [
            "Galle",
            "Colombo"
        ],
        status: false,
    },

    "ND-5678": {
        busNumber: "ND-5678",
        routeNumber: "3",
        startLocation: "Kandy",
        endLocation: "Matara",
        routeStops: [
            "Kandy",
            "Nuwara Eliya",
            "Galle",
            "Matara"
        ],
        status: true,
    },

    "ND-9101": {
        busNumber: "ND-9101",
        routeNumber: "4",
        startLocation: "Negombo",
        endLocation: "Colombo",
        routeStops: [
            "Negombo",
            "Ja-Ela",
            "Colombo"
        ],
        status: true,
    },
}

const BusTrackingDetails = () => {
    const { busNumber } = useParams<string>()
    const [loading, setLoading] = useState(true)
    const [busRouteDetails, setBusRouteDetails] = useState<BusRouteTypes | null>(null)

    useEffect(() => {
        if (busNumber) {
            const details = mockBusData[busNumber]
            setBusRouteDetails(details || null)
            setLoading(false)
        }
    }, [busNumber])

    if (loading) return <p>Loading...</p>

    return (
        <div className="px-2">
            <Headline title={`Bus Tracking - ${busNumber}`} />

            <div className="mt-3">
                <PrimaryBtn
                    title={"refresh"}
                    type={"button"}
                    onClick={() => window.location.reload()}
                    classes={"bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"}
                />
            </div>

            <div>
                {/* Placeholder for map */}
                map
            </div>

            <div className="mt-2">
                {/* Show status */}
                <div className="flex items-center text-right font-medium pl-4">
                    {busRouteDetails ? (
                        busRouteDetails.status ? (
                            <div className="relative flex items-center">
                                <span className="absolute flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                                </span>
                                <span className="ml-5 text-green-600 capitalize">Active on road</span>
                            </div>
                        ) : (
                            <div className="relative flex items-center">
                                <span className="absolute flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="ml-5 text-red-600 capitalize">Not active on road</span>
                            </div>
                        )
                    ) : (
                        <div className="w-full text-center text-sm text-gray-500 mt-2">
                            Bus details not available.
                        </div>
                    )}

                </div>
            </div>

            <div className="mt-4">
                <div>
                    <div className="capitalize text-md font-medium">starting point</div>
                    <LocationPointBox location={busRouteDetails?.startLocation || "N/A"} />
                </div>
                <div className="mt-1">
                    <div className="capitalize text-md font-medium">ending point</div>
                    <LocationPointBox location={busRouteDetails?.endLocation || "N/A"} />
                </div>
            </div>

            <div>
                <div className="mt-4 capitalize text-lg font-medium">details</div>
                <div className="mb-2 text-xs text-slate-500">Based on selected route on bus</div>
                {busRouteDetails && busRouteDetails.routeStops.length > 0 ? (
                    busRouteDetails.routeStops.map((stop, index) => (
                        <div
                            key={index}
                            className="w-full capitalize text-[12px] text-left pl-4 p-1 my-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
                        >
                            {stop}
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center text-sm text-gray-500 mt-2">
                        No route stops available.
                    </div>
                )}
            </div>

            <div className="py-4">
                <div className="mb-3">
                    <PrimaryBtn
                        title={"cancel"}
                        type={"button"}
                        onClick={() => { }}
                        classes={"bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"}
                    />
                </div>

                <div className="mt-2">
                    <PrimaryBtn
                        title={"go home"}
                        type={"button"}
                        onClick={() => { }}
                        classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-950 text-white"}
                    />
                </div>
            </div>
        </div>
    )
}

export default BusTrackingDetails
