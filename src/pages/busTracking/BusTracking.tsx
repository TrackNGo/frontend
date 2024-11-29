import { useEffect, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import SecondaryBtn from "../../components/btn/secondaryBtn/SecondaryBtn"
import BusDetails from "../../components/busDetails/BusDetails"
import Headline from "../../components/headline/Headline"
import BusDetailsType from "../../types/busDetails/BusDetailsTypes"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const BusTracking = () => {
    const [buses, setBuses] = useState<BusDetailsType[]>([])
    const [filterStatus, setFilterStatus] = useState<"all" | "await" | "onroad">("all")

    const navigate = useNavigate()

    const fetchBuses = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api-bus/buses")
            setBuses(response.data)
            //console.log(response.data)
        } catch (error: any) {
            console.log({ error })
        }
    }

    useEffect(() => {
        fetchBuses()
    }, [])

    const filteredBuses = buses.filter((bus) => {
        if (filterStatus === "await") {
            return !bus.status
        }
        if (filterStatus === "onroad") {
            return bus.status
        }
        return true
    })

    return (
        <div className="px-2">
            <Headline title={"bus tracking"} />

            <div className="mt-3">
                <PrimaryBtn
                    title={"refresh"}
                    type={"button"}
                    onClick={() => window.location.reload()}
                    classes={"bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black"}
                />
            </div>

            <div className="flex items-center justify-between py-4">
                <div>
                    <h2 className="text-2xl font-semibold">Buses</h2>
                    <p className="text-gray-500 text-xs">Active and On Road Buses</p>
                </div>

                <div className="flex space-x-2">
                    <SecondaryBtn
                        title={"all"}
                        onClick={() => setFilterStatus("all")}
                        classes={`border-black hover:bg-black hover:text-white hover:border-white ${filterStatus === "all" ? "bg-black text-white" : "bg-white text-black"}`}
                    />

                    <SecondaryBtn
                        title={"await"}
                        onClick={() => setFilterStatus("await")}
                        classes={`border-black hover:bg-black hover:text-white hover:border-white ${filterStatus === "await" ? "bg-black text-white" : "bg-white text-black"}`}
                    />

                    <SecondaryBtn
                        title={"on road"}
                        onClick={() => setFilterStatus("onroad")}
                        classes={`border-black hover:bg-black hover:text-white hover:border-white ${filterStatus === "onroad" ? "bg-black text-white" : "bg-white text-black"}`}
                    />
                </div>
            </div>

            <div className="mt-1">
                {buses && filteredBuses.length > 0 ? (
                    filteredBuses.map((bus, index) => (
                        <div onClick={() => navigate(`/bustracking/details/${bus.busNumber}`)} key={index}>
                            <BusDetails
                                busNumber={bus.busNumber}
                                startLocation={bus.startLocation}
                                endLocation={bus.endLocation}
                                routeNumber={bus.routeNumber}
                                fareEstimate={bus.fareEstimate}
                                status={bus.status}
                            />
                        </div>
                    ))
                ) : (
                    <p className="px-4">No buses available</p>
                )}
            </div>

            <div className="py-4">
                <PrimaryBtn
                    title={"go home"}
                    type={"button"}
                    onClick={() => { }}
                    classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
                />
            </div>
        </div>
    )
}

export default BusTracking
