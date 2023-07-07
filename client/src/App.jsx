import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pay from './pages/pay';
import Success from './pages/success';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Navbar from './components/navbar';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <div>
      
      <Navbar/>

        <Routes>
          <Route path="/finished" element={<Success />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

       
      </div>
    </Router>
  );
}

export default App;
