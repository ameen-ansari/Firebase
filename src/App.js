import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import { auth } from './Firebase';

// setuserEmail('ahf')
const App = () => {
  const [userEmail, setuserEmail] = useState()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuserEmail(user?.email)
    })
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage printmail={userEmail} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}


export default App;
