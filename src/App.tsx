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
import LnSHome from './pages/lostAndfound/LnSHome'
import FoundItemReport from './pages/lostAndfound/FoundItemReport'
import LostItemReport from './pages/lostAndfound/LostItemReport'
import SearchItem from './pages/lostAndfound/SearchItem'
import NewsFeed from './pages/news/NewsFeed'
import ReportForm from './pages/reportForm/ReportForm'
import EmergencyAlertPage from './pages/emergencyaletPage/EmergencyAlertPage'
import ContactUsPage from './pages/contactus/ContactUsPage'
//Lost and Found 
// import LnSHome from './pages/lostAndfound/LnSHome'
// import LostItemReport from './pages/lostAndfound/LostItemReport'
// import FoundItemReport from './pages/lostAndfound/FoundItemReport'
// import SearchItem from './pages/lostAndfound/SearchItem'
import BusTrackingUsingRoute from './pages/busTracking/BusTrackingUsingRoute'
import ViewTimeTable from './pages/timeTable/ViewTimeTable'
import ViewFareEstimate from './pages/fareEstimate/ViewFareEstimate'
import BusTrackingBySearch from './pages/busTracking/BusTrackingBySearch'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/timetable' element={<TimeTable />} />
            <Route path='/busroute' element={<BusRoute />} />
            <Route path='/fareestimate' element={<FareEstimate />} />
            <Route path='/fareestimate/details' element={<FareEstimateDetails />} />

            <Route path='/bustracking' element={<BusTracking />} />
            <Route path="/bustracking/routes/:routeNumber" element={<BusTrackingUsingRoute />} />
            <Route path="/bustracking/routes/search/:start/:end" element={<BusTrackingBySearch />} />
            <Route path='/bustracking/details/:busNumber' element={<BusTrackingDetails />} />

            <Route path='/testing' element={<Testing />} />

            <Route path='/LnSHome' element={<LnSHome />} />
            <Route path='/FoundItemReport' element={<FoundItemReport />} />
            <Route path='/LostItemReport' element={<LostItemReport />} />
            <Route path='/SearchItem' element={< SearchItem />} />

            <Route path='/timetable/views/:start/:end' element={<ViewTimeTable />} />

            <Route path='/fareestimate/views/:start/:end' element={<ViewFareEstimate />} />

            <Route path='/news' element={<NewsFeed />} />

            <Route path='/reportform' element={<ReportForm />} />
            <Route path='/contactus' element={<ContactUsPage />} />

            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />} >
              <Route path='/dashboard/:busNumber' element={<Dashboard />} />
              <Route path='/changepassword' element={<ChangePassword />} />
              <Route path='/emergency' element={<EmergencyAlertPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
