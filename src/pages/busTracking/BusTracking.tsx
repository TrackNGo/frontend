import BusTrack from "../../components/busTrack/BusTrack"
import baseUrl from "../../common/baseBackendUrl"

const BusTracking = () => {
    //172.16.193.135
    return (
        <>
            <BusTrack url={`${baseUrl.adminBackend}api-bus/buses`} />
        </>
    )
}

export default BusTracking
