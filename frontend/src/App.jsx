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
import Extension from './pages/Extension.jsx'
import Features from './pages/Features.jsx'
function App() {
const {checkAuth,authUser,isCheckingAuth}= useAuthStore()

useEffect(() => {
  checkAuth();
}, [checkAuth]);

console.log("Auth User:", authUser);
  return (
    < div className='dark min-h-screen'>
      <Routes>
        {/* Public Home */}
        <Route path="/" element={<Layout />}>
          <Route index element={!authUser ? <CodeTrackerHero /> : <Navigate to="/dashboard" replace />} />
          
          {/* Auth Routes */}
          <Route
            path="signin"
            element={!authUser ? <Signin /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="signup"
            element={!authUser ? <Signup /> : <Navigate to="/dashboard" replace />}
          />
           <Route path="extension" element={<Extension />} />
          <Route path="feature" element={<Features />} />

          {/* Protected Routes */}
          {authUser && (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="submission" element={<SubmissionsDashboard />} />
              <Route path="extension" element={<Extension />} />
            </>
          )}
          
          {/* If not logged in and tries to access protected, redirect */}
          {!authUser && (
            <>
              <Route
                path="dashboard"
                element={<Navigate to="/signin" replace />}
              />
              <Route
                path="profile"
                element={<Navigate to="/signin" replace />}
              />
              <Route
                path="submission"
                element={<Navigate to="/signin" replace />}
              />
              <Route
                path="extension"
                element={<Navigate to="/signin" replace />}
              />
            </>
          )}
        </Route>
      </Routes>
   <Toaster />
    </div>
  )
}

export default App
