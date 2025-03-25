import { useParams } from "react-router-dom"
import BusTrack from "../../components/busTrack/BusTrack"
import baseUrl from "../../common/baseBackendUrl"

const BusTrackingUsingRoute = () => {
    const { routeNumber } = useParams<{ routeNumber: string }>() // Get routeNumber from URL parameter

    return (
        <BusTrack url={`${baseUrl.adminBackend}api-bus/bus/routenumber/${routeNumber}`} />
    )
}

export default BusTrackingUsingRoute
