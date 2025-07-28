import { useState } from 'react'
import CodeTrackerHero from './pages/Hero.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
function App() {
const {checkAuth,authUser,isCheckingAuth}= useAuthStore()
console.log("Auth User:", authUser);
  return (
    < div className='dark'>
     
      <Routes>
        <Route path='/' element={<CodeTrackerHero />} />
        <Route path='/signin' element={!authUser ?<Signin/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to="/"/>}/>
        </Routes>
      
      
     

   <Toaster />
    </div>
  )
}

export default App
