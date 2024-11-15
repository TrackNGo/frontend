import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Testing from './pages/testing/Testing'
import ChangePassword from './pages/auth/ChangePassword'
import BusTracking from './pages/busTracking/BusTracking'
import BusTrackingDetails from './pages/busTrackingDetails/BusTrackingDetails'
import FareEstimate from './pages/fareEstimate/FareEstimate'
import Home from './pages/home/Home'
import Schedule from './pages/schedule/Schedule'
import BusRoute from './pages/busRoute/BusRoute'

function App() {

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/busroute' element={<BusRoute />} />
          <Route path='/fareestimate' element={<FareEstimate />} />
          
          <Route path='/bustracking' element={<BusTracking />} />
          <Route path='/bustracking/details/:busNumber' element={<BusTrackingDetails />} />

          <Route path='/login' element={<Login />} />
          <Route path='/changepassword' element={<ChangePassword />} />

          <Route path='/' element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
