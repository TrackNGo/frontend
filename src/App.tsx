import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Testing from './pages/testing/Testing'
import LnSHome from './pages/lostAndfound/LnSHome'
import LostItemReport from './pages/lostAndfound/LostItemReport'
import FoundItemReport from './pages/lostAndfound/FoundItemReport'

function App() {

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Testing />} />
          <Route path='/LnSHome' element={<LnSHome />} />
          <Route path='/LostItemReport' element={<LostItemReport />} />
          <Route path='/FoundItemReport' element={<FoundItemReport />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
