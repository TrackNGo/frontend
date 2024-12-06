import BusTrack from "../../components/busTrack/BusTrack"

const BusTracking = () => {
    //172.16.193.135
    return (
        <>
            <BusTrack url="http://localhost:3000/api-bus/buses" />
        </>
    )
}

export default BusTracking
