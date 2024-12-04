import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Circle, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import UserIcon from '../mapIcon/UserIcon'

// Define the type for Position
type Position = [number, number] | null;

// Main component - custom made switch for locate user current location
const UserLocateButtonCustom: React.FC = () => {

  const [position, setPosition] = useState<Position>(null);
  const [makeUserVisible, setUserVisible] = useState<boolean>(false);

  // Default position for Sri Lanka
  const defaultPosition: Position = [7.8731, 80.7718];

  // Effect for fetching user's location
  useEffect(() => {

    if (makeUserVisible && navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    }
  }, [makeUserVisible]);

  const map = useMap();

  useEffect(() => {
    const switchControl = new L.Control({ position: 'topright' });

    switchControl.onAdd = () => {

      const div = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom');
      L.DomEvent.disableClickPropagation(div);

      div.style.top = '20px';    // Adjust the top margin
      div.style.right = '50px';   // Adjust the right margin

      // Render the React Bootstrap switch buttons using JSX
      const SwitchComponent: React.FC = () => (
        <div className="flex items-center space-x-2">
          <label className="text-lg font-bold">Find Me</label>
          <input
            type="checkbox"
            id="custom-switch"
            className="toggle toggle-primary"
            style={{ transform: 'scale(1.5)', marginBottom: '5px' }} // Increase size and spacing
            onChange={(e) => {
              setUserVisible(e.target.checked);
            }}
          />
        </div>
      );

      // Render the React component into the Leaflet control container
      const root = createRoot(div); // Create a root in the div
      root.render(<SwitchComponent />);

      return div;
    };

    switchControl.addTo(map);

    // Clean up control on component unmount
    return () => {
      map.removeControl(switchControl);
    };
  }, [map]);

  // Show user's position and circle if it's available and user visibility is true
  if (position && makeUserVisible) {
    return (
      <>
        <MapZoomCenter position={position} isActive={makeUserVisible} />
        <Marker position={position} icon={UserIcon}/>
        <Circle
          center={position}
          radius={1000} // 1000 meters
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
        />
      </>
    );
  } else {
    return (
      <>
        <MapZoomCenter position={defaultPosition} isActive={makeUserVisible} />
      </>
    );
  }
};

// Map zoom component
const MapZoomCenter: React.FC<{ position: Position; isActive: boolean }> = ({ position, isActive }) => {
  
  const map = useMap();

  useEffect(() => {
    const zoomLevel = isActive ? 15 : 8;
    const animationDuration = 4; // Duration in seconds for the slow-motion effect

    // Use flyTo with a slow-motion effect
    map.flyTo(position as [number, number], zoomLevel, {
      animate: true,
      duration: animationDuration, // Control speed of the animation
      easeLinearity: 0.1, // Adjust this for smoother, slower transitions (0.25 to 0.5 recommended)
    });
  }, [position, isActive, map]);

  return null;
};

export default UserLocateButtonCustom;

