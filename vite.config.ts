import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

//run on your mobile phone 
// export default {
//   server: {
//     host: '0.0.0.0',  // Allow external connections
//     port: 5173,       // Use the port you want, e.g., 5173
//   },
// };
