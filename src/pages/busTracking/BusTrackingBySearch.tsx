import { useParams } from "react-router-dom"
import BusTrack from "../../components/busTrack/BusTrack"
import baseUrl from "../../common/baseBackendUrl"

const BusTrackingBySearch = () => {
    const { start, end } = useParams<{ start: string, end: string }>() // Get routeNumber from URL parameter

    return (
        <BusTrack url={`${baseUrl.customerBackend}api-user/searchFor-buses/${start}/${end}`} />
    )
}

export default BusTrackingBySearch
