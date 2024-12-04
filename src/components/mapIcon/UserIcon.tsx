import L from 'leaflet';
import userIcon from '../../assets/img/user.png';

// Define the type for the icon to ensure TypeScript recognizes it correctly
const UserIcon: L.Icon = L.icon({
  iconUrl: userIcon, // Make sure this path is correct
  iconSize: [32, 32], // Adjust as necessary
  iconAnchor: [16, 32], // Center the icon
  popupAnchor: [0, -32] // Offset for popup
});

export default UserIcon;
