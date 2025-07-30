import { useEffect, useState } from 'react'
import CodeTrackerHero from './pages/Hero.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import  NavBar from './components/section/Navbar.jsx'
import Layout from './Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import SubmissionsDashboard from './pages/Submission.jsx'
function App() {
const {checkAuth,authUser,isCheckingAuth}= useAuthStore()

useEffect(() => {
  checkAuth();
}, []);

console.log("Auth User:", authUser);
  return (
    < div className='dark'>
      <Routes>
        <Route path='/' element={!authUser?<CodeTrackerHero />:<Layout/>} > 
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="submission" element={<SubmissionsDashboard />} />
        </Route>
        <Route path='/signin' element={!authUser ?<Signin/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to="/"/>}/>
        </Routes>
   <Toaster />
    </div>
  )
}

export default App
