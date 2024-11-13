import LocationPointBoxType from "../../types/locationPointBox/LocationPointBoxType"

const LocationPointBox = (location:LocationPointBoxType) => {
  return (
    <div className="w-full capitalize text-center p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 ease-in-out">
        {location.location}
    </div>
  )
}

export default LocationPointBox
