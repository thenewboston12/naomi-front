import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import {Container } from 'react-bootstrap'
import {AuthProvider} from "../contexts/AuthContext.jsx"

// importing components
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import UpdateProfile from './UpdateProfile.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div className='w-100' style={{maxWidth: '400px'}}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route element={<PrivateRoute/>}>
                            <Route element={<Dashboard/>} path="/" exact/>
                            <Route element={<UpdateProfile/>} path="/update-profile" exact/>
                        </Route>
                        <Route path='/signup' element={<Signup/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/forgot-password' element={<ForgotPassword/>} />
                        
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    
    </Container>
  
  )
}

export default App
