import busDetailsType from '../../types/busDetails/busDetailsTypes'
import buslog from '../../assets/img/buslogo.png'
const BusDetails = (bus: busDetailsType) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out mb-2">
      <div className="mr-2 rounded-full bg-gray-100 p-1">
        <img
          src={buslog}
          alt="Bus Icon"
          width={"60px"}
        />
      </div>

      <div className="flex-1">
        <div className="text-lg font-semibold uppercase">{bus.busNumber}</div>
        <div className="text-gray-700 capitalize">
          {bus.startLocation} - {bus.endLocation}
        </div>
        <div className="text-sm text-gray-500">
          Route No: {bus.routeNumber} <br />
          Max Fare: Rs {bus.fareEstimate}<br />
          <span className='text-red-500 opacity-100'>Emergency Alert : </span>
          {
            bus.alert.length > 0 ? (
              bus.alert.map((ele: any) => (
                <div key={ele._id} className='flex items-center justify-center text-red-500 opacity-100'>
                  {`${ele.emergencyType} - ${ele.createdAt.split("T")[0]}`}<br />
                  {new Date(ele.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center text-red-500 opacity-100'>
                No alert...
              </div>
            )
          }
        </div>
      </div>

      <div className="flex items-center text-right font-medium">
        {bus.status ? (
          <div className="relative flex items-center">
            <span className="absolute flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
            <span className="ml-5 text-green-600">Active</span>
          </div>
        ) : (
          <div className="relative flex items-center">
            <span className="absolute flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="ml-5 text-red-600">Await</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BusDetails
