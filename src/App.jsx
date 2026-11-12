import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './CMO Pages/AdminDashboard'
import OfficerDashboard from './Officer Page/OfficerDashboard'
import CitizenDashboard from './Pages/CitizenDashboard'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import MyGrievances from './Pages/MyGrievances'
import RegisterPage from './Pages/RegisterPage'
import SubmitGrievanceForm from './Pages/SubmitGrievanceForm'
import TrackGrievance from './Pages/TrackGrievance'
import { Toaster } from 'react-hot-toast'
import AssignDepartmentModal from './CMO Components/AssignDepartmentModal'


function App() {

  return (
    <>
    <Routes>

      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>

      
      <Route path='/dashboard' element={<CitizenDashboard/>}/>
      <Route path='/submit-grievance' element={<SubmitGrievanceForm/>}/>
      <Route path='/my-grievance' element={<MyGrievances/>}/>
      <Route path='/track-grievance' element={<TrackGrievance/>}/>

      <Route path='/officer-dashboard' element={<OfficerDashboard/>}/>

      <Route path='/cmo-dashboard' element={<AdminDashboard/>}/>
      
    </Routes>
    <Toaster
    position="top-right"
    reverseOrder={false}
  />
    </>
  )
}

export default App
