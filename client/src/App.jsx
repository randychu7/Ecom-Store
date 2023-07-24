import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Signup1 from './pages/signup1';
import Signup2 from './pages/signup2';
import List from './pages/list';
import Search from './pages/search';
import Navlog from './components/navbar/navlog';
import ProtectedRoute from './pages/protected';

function App() {
  return (
    <Router>
      <div>
      <Navlog/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signup1" element={<Signup1/>} />
          <Route path="/signup2" element={<Signup2/>} />
          <Route path="/browse" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/my-list" element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }/>
          <Route path="/search" element={
            <ProtectedRoute>
              <Search/>
            </ProtectedRoute>
          }/>
        </Routes>

       
      </div>
    </Router>
  );
}

export default App;
