import { useNavigate } from "react-router-dom"
import BusDetailsType from "../../types/busDetails/busDetailsTypes"
import BusDetails from "../busDetails/BusDetails"

type Props = {
    buses: BusDetailsType[]
}

const BusList: React.FC<Props> = ({ buses }) => {
    const navigate = useNavigate()

    return (
        <div className="mt-1">
            {buses.length > 0 ? (
                buses.map((bus) => (
                    <div key={bus.busNumber}
                        onClick={() => navigate(`/bustracking/details/${bus.busNumber}`)}>
                        <BusDetails {...bus} />
                    </div>
                ))
            ) : (
                <p className="px-4 capitalize">No buses available</p>
            )}
        </div>
    )
}

export default BusList
