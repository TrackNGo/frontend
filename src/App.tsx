import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Testing from './pages/testing/Testing'
import ChangePassword from './pages/auth/ChangePassword'

function App() {

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/' element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
