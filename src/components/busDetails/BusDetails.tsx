import busDetailsType from "../../types/busDetails/busDetailsTypes"

const BusDetails = (bus: busDetailsType) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out mb-2">
      <div className="mr-4">
        <img
          src="bus-icon.png"
          alt="Bus Icon"
          className="w-10 h-10"
        />
      </div>

      <div className="flex-1">
        <div className="text-lg font-semibold">{bus.busNumber}</div>
        <div className="text-gray-700">
          {bus.startLocation} - {bus.endLocation}
        </div>
        <div className="text-sm text-gray-500">
          Route No: {bus.routeNumber} <br />
          Fare: Rs {bus.fareEstimate}
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
