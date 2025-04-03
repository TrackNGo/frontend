import FareDetailsType from "../../types/fareDetails/FareDetailsType"

const FareDetails = (bus:FareDetailsType) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
      <div className="flex-1">
        <div className="text-sm text-gray-500 capitalize">
            Base Fare {bus.busType}
        </div>
        <div className="text-lg font-semibold">
            Rs.{bus.estimatedFare}
        </div>
      </div>
    </div>
  )
}

export default FareDetails
