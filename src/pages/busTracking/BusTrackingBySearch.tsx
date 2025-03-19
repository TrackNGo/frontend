import { useParams } from "react-router-dom"
import BusTrack from "../../components/busTrack/BusTrack"

const BusTrackingBySearch = () => {
    const { start, end } = useParams<{ start: string, end: string }>() // Get routeNumber from URL parameter

    return (
        <BusTrack url={`http://localhost:8080/api-user/searchFor-buses/${start}/${end}`} />
    )
}

export default BusTrackingBySearch
