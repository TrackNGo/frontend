import LocationPointBox from "../locationPointBox/LocationPointBox"

interface LocationInfoProps {
    title: string
    location: string
  }
  
  const LocationInfo = ({ title, location }: LocationInfoProps) => {
    return (
      <div className="mt-4">
        <div className="capitalize text-md font-medium">{title}</div>
        <LocationPointBox location={location} />
      </div>
    )
  }
  
  export default LocationInfo
  