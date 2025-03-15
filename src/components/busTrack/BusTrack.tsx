import { useState } from "react"
import useFetch from "../../hooks/useFetch/useFetch"
import BusDetailsType from "../../types/busDetails/busDetailsTypes"
import FilterButtons from "../btn/filterBtnList/FilterButtons"
import PrimaryBtn from "../btn/primaryBtn/PrimaryBtn"
import BusList from "../busList/BusList"
import Headline from "../headline/Headline"

interface Url{
    url:string
}

const BusTrack = (url:Url) => {
    const [filterStatus, setFilterStatus] = useState<"all" | "await" | "onroad">("all")
    const { data: buses, loading, error } = useFetch<BusDetailsType>(url.url)

    const filteredBuses = buses.filter((bus) => {
        if (filterStatus === "await") return !bus.status
        if (filterStatus === "onroad") return bus.status
        return true
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

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

                <FilterButtons filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            </div>

            <BusList buses={filteredBuses} />

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

export default BusTrack