import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Testing from './pages/testing/Testing'
import ChangePassword from './pages/auth/ChangePassword'
import BusTracking from './pages/busTracking/BusTracking'
import BusTrackingDetails from './pages/busTrackingDetails/BusTrackingDetails'
import FareEstimate from './pages/fareEstimate/FareEstimate'
import Home from './pages/home/Home'
import TimeTable from './pages/timeTable/TimeTable'
import BusRoute from './pages/busRoute/BusRoute'
import FareEstimateDetails from './pages/fareEstimateDetails/FareEstimateDetails'
import Dashboard from './pages/dashboard/Dashboard'
import Header from './components/header/Header'

//Lost and Found 
// import LnSHome from './pages/lostAndfound/LnSHome'
// import LostItemReport from './pages/lostAndfound/LostItemReport'
// import FoundItemReport from './pages/lostAndfound/FoundItemReport'
// import SearchItem from './pages/lostAndfound/SearchItem'

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/timetable' element={<TimeTable />} />
          <Route path='/busroute' element={<BusRoute />} />
          <Route path='/fareestimate' element={<FareEstimate />} />
          <Route path='/fareestimate/details' element={<FareEstimateDetails />} />

          <Route path='/bustracking' element={<BusTracking />} />
          <Route path='/bustracking/details/:busNumber' element={<BusTrackingDetails />} />

          <Route path='/login' element={<Login />} 
          <Route path='/changepassword' element={<ChangePassword />} />

          <Route path='dashboard' element={<Dashboard/>}/>

          <Route path='/testing' element={<Testing />} />
            
<!--       <Route path='/LnSHome' element={<LnSHome />} />
          <Route path='/LostItemReport' element={<LostItemReport />} />
          <Route path='/FoundItemReport' element={<FoundItemReport />} />
          <Route path='/SearchItem' element={<SearchItem />} /> -->
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
