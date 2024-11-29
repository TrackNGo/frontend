import { useParams } from "react-router-dom"
import BusTrack from "../../components/busTrack/BusTrack"

const BusTrackingUsingRoute = () => {
    const { routeNumber } = useParams<{ routeNumber: string }>() // Get routeNumber from URL parameter

    return (
        <BusTrack url={`http://localhost:3000/api-bus/bus/routenumber/${routeNumber}`} />
    )
}

export default BusTrackingUsingRoute
