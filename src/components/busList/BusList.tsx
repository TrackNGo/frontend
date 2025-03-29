import { useNavigate } from "react-router-dom"
import BusDetailsType from "../../types/busDetails/busDetailsTypes"
import BusDetails from "../busDetails/BusDetails"
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../common/baseBackendUrl"

type Props = {
    buses: BusDetailsType[]
}

const BusList: React.FC<Props> = ({ buses }) => {
    const navigate = useNavigate()
    const [allBusAlert, setAllBusAlert] = useState([])

    useEffect(() => {
        if (buses) {
            async function getAllBusAlert() {
                const response = await axios.get(`${baseUrl.customerBackend}api-emergency`)
                if (response.data.data.length > 0) {
                    setAllBusAlert(response.data.data)
                }
                else {
                    setAllBusAlert([])
                }
            }
            const intervalId = setInterval(getAllBusAlert, 5000); // Fetch every 5 seconds
            return () => clearInterval(intervalId);
        }

    })


    function checkForBusEmergencies(busNumber: any) {
        const res = allBusAlert.filter((ele: any) => ele.busNumber == busNumber)
        return res;
    }

    return (
        <div className="mt-1">
            {buses.length > 0 ? (
                buses.map((bus) => {

                    const tempAlert = checkForBusEmergencies(bus.busNumber)

                    return (
                        <div key={bus.busNumber}
                            onClick={() => navigate(`/bustracking/details/${bus.busNumber}`)}>
                            <BusDetails {...bus} alert={tempAlert} />
                        </div>
                    )
                })
            ) : (
                <p className="px-4 capitalize">No buses available</p>
            )}
        </div>
    )
}

export default BusList
