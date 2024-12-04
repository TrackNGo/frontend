import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import UserLocationSwitch from "../userLocationSwitch/UserLocationSwitch";
import "leaflet/dist/leaflet.css";
import LocationType from "../../types/location/LocationType";
import RouteData from "../../types/location/RouteData"
import polyline from "@mapbox/polyline"; // Import polyline from @mapbox/polyline
import LocationIcon from "../mapIcon/LocationIcon";
import SubLocationIcon from "../mapIcon/SubLocationIcon";
import BusLiveLocation from "../busLocation/BusLiveLocation";


const Map: React.FC<{ locations: LocationType[], drawRoute: RouteData[], trackBusNumber: string}> = ({ locations, drawRoute, trackBusNumber}) => {

  return (
    <>
      <MapContainer
        center={[7.8731, 80.7718]} // Center coordinates for Sri Lanka
        zoom={8}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "500px" }} // Full width with sufficient height
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        
        <UserLocationSwitch />

        {
          locations.map((location, index) => {

            if (index === 0) {

              return (
                <Marker key={index} position={location.coordinates} icon={LocationIcon}>
                  <Popup>Starts: {location.name}</Popup>
                </Marker>
              );
            } else if (index === locations.length - 1) {

              return (
                <Marker key={index} position={location.coordinates} icon={LocationIcon}>
                  <Popup>Ends: {location.name}</Popup>
                </Marker>
              );
            } else {

              return (
                <Marker key={index} position={location.coordinates} icon={SubLocationIcon}>
                  <Popup>{location.name}</Popup>
                </Marker>
              );
            }
          })
        }

        {
          (drawRoute.length > 0 && (
            <Polyline
                positions={drawRoute.flatMap((seg) => {
                    const decode = polyline.decode(seg.route).map(([lat, lng]) => ({lat,lng}))
                    
                    return (decode);
                })}
                color="blue"
                weight={4}
                opacity={0.5}
            />
        ))
        }

        <BusLiveLocation busNumber={trackBusNumber}/>
        
      </MapContainer>
    </>
  );
};

export default Map;
